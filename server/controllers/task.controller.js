const Task = require('../models/task.model');

exports.getTasks = async (req, res) => {
  const { priority, status } = req.query;

  try {
    const filters = { userId: req.user.id };
    if (priority) filters.priority = Number(priority);
    if (status) filters.status = status;

    const tasks = await Task.find(filters).sort({ startTime: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.addTask = async (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;
  
  try {
    const existingTask = await Task.findOne({ title, userId: req.user.id });
    if (existingTask) {
      return res.status(400).json({ message: 'Task with this title already exists' });
    }

    // Ensure startTime and endTime are valid Date objects
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const task = new Task({
      title,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      priority,
      status,
      userId: req.user.id
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};


  exports.getTaskWithId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findOne({ _id: id, userId: req.user.id });
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Failed to retrieve task' });
    }
  };
  

  exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    // Ensure startTime and endTime are valid if provided in the update
    if (updates.startTime) {
      const parsedStartTime = new Date(updates.startTime);
      if (isNaN(parsedStartTime)) {
        return res.status(400).json({ message: 'Invalid startTime format' });
      }
      updates.startTime = parsedStartTime;
    }
  
    if (updates.endTime) {
      const parsedEndTime = new Date(updates.endTime);
      if (isNaN(parsedEndTime)) {
        return res.status(400).json({ message: 'Invalid endTime format' });
      }
      updates.endTime = parsedEndTime;
    }
  
    try {
      const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        updates,
        { new: true }
      );
      
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update task' });
    }
  };
  
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    // General Statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'finished').length;
    const pendingTasks = totalTasks - completedTasks;

    const totalCompletionTime = tasks
      .filter(task => task.status === 'finished')
      .reduce((sum, task) => sum + (new Date(task.endTime) - new Date(task.startTime)) / 3600000, 0);

    const pendingTimeStats = tasks
      .filter(task => task.status === 'pending')
      .reduce(
        (stats, task) => {
          const timeElapsed = Math.max((new Date() - new Date(task.startTime)) / 3600000, 0);
          const balanceEstimate = Math.max((new Date(task.endTime) - new Date()) / 3600000, 0);
          stats.timeElapsed += timeElapsed;
          stats.balanceEstimate += balanceEstimate;
          return stats;
        },
        { timeElapsed: 0, balanceEstimate: 0 }
      );

    const averageCompletionTime = completedTasks > 0 ? totalCompletionTime / completedTasks : 0;

    // Priority Breakdown
    const priorityBreakdown = tasks.reduce((breakdown, task) => {
      // Ensure priority exists in the breakdown
      if (!breakdown[task.priority]) {
        breakdown[task.priority] = {
          priority: task.priority,
          pendingTasks: 0,
          timeLapsed: 0,
          timeToFinish: 0,
        };
      }

      // For pending tasks, calculate time stats
      if (task.status === 'pending') {
        const timeElapsed = Math.max((new Date() - new Date(task.startTime)) / 3600000, 0);
        const timeToFinish = Math.max((new Date(task.endTime) - new Date()) / 3600000, 0);

        breakdown[task.priority].pendingTasks += 1;
        breakdown[task.priority].timeLapsed += timeElapsed;
        breakdown[task.priority].timeToFinish += timeToFinish;
      }

      return breakdown;
    }, {});

    // Transform priorityBreakdown object into an array
    const priorityBreakdownArray = Object.keys(priorityBreakdown)
      .sort((a, b) => a - b) // Sort by priority (ascending)
      .map(priority => {
        const item = priorityBreakdown[priority];
        return {
          priority: item.priority,
          pendingTasks: item.pendingTasks,
          timeLapsed: Number(item.timeLapsed.toFixed(2)), // Format to 2 decimal places
          timeToFinish: Number(item.timeToFinish.toFixed(2)) // Format to 2 decimal places
        };
      });

    // Send the response
    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completedPercentage: Number(((completedTasks / totalTasks) * 100).toFixed(2)),
      pendingPercentage: Number(((pendingTasks / totalTasks) * 100).toFixed(2)),
      timeElapsed: Number(pendingTimeStats.timeElapsed.toFixed(2)),
      balanceEstimate: Number(pendingTimeStats.balanceEstimate.toFixed(2)),
      averageCompletionTime: Number(averageCompletionTime.toFixed(2)),
      priorityBreakdown: priorityBreakdownArray,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};


  