# Restaurant-Menu-App ( React-native)

step 1: First setUp json-server 
step 2: download or clone repository at convenient location for example 'myApp'.
step 3: start json server (info given below).
step 4: at command prompt go to the folder directory 'myApp' and Run 'expo start'
step 5: make sure expo app is installed at phone to run on physical device .
step 6: can be run on emulator


I added screen recording (App-video) that how app works. json servser is used.
So make sure hostname and portname are correctly define at shared/baseUrl.js . 
To run json server, got to json-server folder directory and Run 'json-server -w db.json -H hostname -p portnumber' at command prompt.

App Features: 1. LoginComponent ---  we can signUp and then login
          2. HomeComponent ---  Animation is created with images
          3. MenuComponent --- We can see menu and specific dish details. we can also do comment ,like and share
          4. FavoriteComponent --- All liked dishes will be listed here . we can remove liked dishes from here by swipe left and then delete
          5. contactComponent --- mail can be send to the restaurant from here
          6. ReservationComponent --- reservation can be done 
 
 
