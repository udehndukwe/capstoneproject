// Client ID and API key from the Developer Console
var CLIENT_ID = '30103759882-5omonj1s3lamheplnndf3h2qbkso8cvc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCjlUHnUqyiFULh9YmvsNu0LYW5KLCsIUU'

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        listFiles();
    }
}

/**
 *  Sign in the user upon button click.
 */
function authenticate() {
    return gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function signout() {
    return gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print files.
 */
function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
        var files = response.result.files;
        document.getElementById('fileList').innerHTML = '';
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                document.getElementById('fileList').appendChild(createFileElement(file.name));
            }
        } else {
            document.getElementById('fileList').appendChild(document.createTextNode('No files found.'));
        }
    });
}

/**
 * Create file element.
 */
function createFileElement(name) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(name));
    return li;
}
