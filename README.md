# theMnemonicBranching


to get this running you need a node server set up just like schiffman does in this video https://www.youtube.com/watch?v=HZ4D3wDRaec&t=932s <br>
run http-server in the terminal in the folder where you pulled this repo <br>
run your code from localhost so that the camera works


#updates 22.11.2020

attnGAN connected to the labels and charRNN generated. every character is logged to console.

#updates 14.12.2020

attngan and charRNN working again.
Started working on the layout.
Clicking the button will take a screenshot of the video
I'll be working on the visual effects for the image next.

To run this pull main, and run the following command:
$ python3 -m http.server

## To-do list
- **UI**
    - General layout: 
        - Design the UI so that we have a a clear idea of how we want this to look.
        - Code this UI
    - Fixe the green squares exceed the camera recording and leave a trace in the sketch
    - Loading states are static, would be cool if we could add a spinner animation or something when the models are loading
- **Title**
    - The titles still look wonky :/, work with other libraries to see if we can make the text output look more like an artwork title
    - When the title is created, a new HTML element appears, that moves everything else downwards. Adjust this so that it doesn't move.
- **Artwork**
    - The image is not being edited right now. Look for generative methods to mess up the image taken from the webcam
- **Misc**
    - Remove AttnGan from code
- **Push to server**



