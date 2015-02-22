# capture
Instantly generate websites and apps from mocks.

Also on http://challengepost.com/software/capture

## Technical design

#### Repos
https://github.com/grant/capture-opencv
https://github.com/grant/capture

#### Architecture

![arch](https://cloud.githubusercontent.com/assets/744973/6320042/de09eb58-ba88-11e4-8111-d077772c23f8.jpg)

1. From our iOS app, you can take a picture of your website design which will be uploaded to the cloud
2. We get the url of the uploaded image
3. We send the image url to our node web server
4. The node server relays the image url for processing on the python server that has OpenCV setup
5. The python server sends the proccessed image data to the node server for generating the page
6. The generated page has a unique url which is sent back to the iPhone app for mobile viewing
7. The iPhone views the website (from the node server)

In the the process, data from the generated site and changes to the site are stored on Firebase.
