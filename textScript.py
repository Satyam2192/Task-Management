import os

def extract_text_from_folder(folder_path, output_file, files_to_skip=None, folders_to_skip=None):
    """
    Extracts text from all files within a folder and its subfolders.
    """

    if files_to_skip is None:
        files_to_skip = []
    if folders_to_skip is None:
        folders_to_skip = []

    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_file_path = os.path.join(script_dir, output_file)

    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        for foldername, subfolders, filenames in os.walk(folder_path):
            # Check if folder to skip is in the current folder path
            should_skip_folder = any(folder in foldername for folder in folders_to_skip)

            if should_skip_folder:
                print(f"Skipping specified folder: {foldername}")
                continue  

            for filename in filenames:
                if filename in files_to_skip:
                    print(f"Skipping specified file: {filename}")
                    continue

                file_path = os.path.join(foldername, filename)

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        text = f.read()
                    outfile.write(f"--- File: {file_path} ---\n\n")
                    outfile.write(text)
                    outfile.write("\n\n")
                except UnicodeDecodeError:
                    print(f"Skipping binary file: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    folder_to_extract = "/home/sk/Desktop/task management app/server"
    output_text_file = "extracted_text.txt" 
    files_to_skip = ["LogIn.jsx", "SignUp.jsx","EDA.ipynb","evaluate.ipynb","textScript.py","stock_price.csv","README.md","globals.css","auto_complete.json", "another_file.css", "LogoBadge.svelte","README.md",".gitignore","package-lock.json","package.json"]
    folders_to_skip = ["results","models","notebooks","data","env","__pycache__","resetpassword","login","register","assets","icon", "asset", "node_modules",".git"]  

    extract_text_from_folder(folder_to_extract, output_text_file, files_to_skip, folders_to_skip)
    print(f"Text extraction complete. Output saved to: {output_text_file}")