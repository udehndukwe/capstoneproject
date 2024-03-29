import tkinter
from tkinter import filedialog
import os

title = "Open File Bitch"

file_path = tkinter.filedialog.askopenfilename(title=title)


print(os.stat(file_path))