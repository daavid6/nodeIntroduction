const { google } = require('googleapis');
const { Drive_Initialization_Error } = require('./errors.js');
const templateFormatterSA = require("./serviceaccount.json");
const fs = require("fs");

const FOLDER_ID = "1dK-KbLt9eVC7jw_LXpNdyq6NIHV1jvqu";


async function main() {
  const accessToken = await authenticate();

  const drive = google.drive({
      version: "v3",
      auth: accessToken,
  });

  let result = "Title,Creation,Modified,Owner,Link\n";
  
  await drive.files
    .list({
      q: `'${FOLDER_ID}' in parents and mimeType='application/pdf'`,
      fields: "files(name, createdTime, modifiedTime, owners, webViewLink)",
      spaces: "drive",
    })
    .then((response) => {
      const files = response.data.files;
      if (!files.length) console.log("No files found.");
      files.forEach((file) => {
        result += file.name + ',' + file.createdTime + ',' + file.modifiedTime + ',' + file.owners[0].displayName + ',' + file.webViewLink + '\n';
      });
    })
    .catch((error) => {
      console.error("The API returned an error: " + error);
    }); 

    fs.writeFile('output.csv', result, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
}



async function authenticate() {
  const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

  const jwToken = new google.auth.JWT(
    templateFormatterSA.client_email,
    null,
    templateFormatterSA.private_key,
    SCOPES
  );

  try {
    await jwToken.authorize();
  } catch (error) {
    throw new Drive_Initialization_Error(error);
  }

  return jwToken;
}

main();