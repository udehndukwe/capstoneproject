from googleApiclient.http import MediaFileUpload
from Google import Create_Service

CLIENT_SECRET_FILE = '.\clientsecret.json'
API_NAME = 'drive'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/drive']

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

folder_id = '1c46jpYtZXWwiOnVvPwbWto2IW4K5l4YX'

file_names = ['Senior Capstone Student Logbook.docx']
mime_types = ['application/msword']

for file_name, mime_type in zip(file_names, mime_types):
    file_metadata = {
        'name': file_name,
        'parents': [folder_id]

    }

    MediaFileUpload('/Downloads/{0}'.format(file_name), mimetype=mime_type)

    service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute