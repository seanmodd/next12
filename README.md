<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/seanmodd/next12/tree/vSean">
    <img src="public/static/x_logo.svg" alt="Logo" width="80px">
  </a>

<h3 align="center">Project Shop CarX</h3>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#Todo">Need to do still</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

 <img src="https://i.imgur.com/3rKyotM.jpeg" alt="Logo" width="350px">


<table>
<tr>
<td>

ShopCarX.com is a web application that allows users to search for and purchase used AND new cars. 
The organization of the directory sucks and needs to constantly be updated. Sorry for that, I suck - Sean Modd.

<details close>
<summary><b>Inventory of Vehicles</b></summary>
<br />

The **ShopCarX** inventory is being scraped on a daily basis from the following dealerships:

- [Stevens Creek Chrysler Jeep Dodge](https://www.stevenscreekchryslerjeepdodge.net/)
- [Stevens Creek Kia](https://www.stevenscreekkia.com/)
- [Fremont Mazda](http://fremontmazda.com/)
- [Serramonte Subaru](https://www.serramontesubaru.com/)
- [Serramonte Volkswagen](https://www.serramontevw.com/)
- [Hayward Volkswagen](https://www.vwhayward.com/)
- [Hayward Nissan](http://www.haywardnissan.com/)
- [Stoneridge Chrysler Dodge Jeep Ram](https://www.stoneridgechryslerjeepdodgeofdublin.com/)
- [Sunnyvale Chrysler Dodge Jeep Ram](https://www.sunnyvalecdjr.com/)
</details>


</td>
</tr>
</table>

<details close>
<summary><b>Key Pages</b></summary>
<br>

<table>
<tr>
<td>
<div align="left">
 <h3>Page for all car inventory: </h3>
 <body> - The path is <code>/dashboard/shop</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/1tErCwQ.jpeg" alt="Car" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Page for single car: </h3>
 <body> - The path is <code>/dashboard/shop/[makeName]/[id]</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/8KH1D6c.jpeg" alt="Car" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via Make & Model: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/PT8Be5L.jpeg" alt="CarFax" width="350px">
</td>
</tr>

<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via Vehicle VIN: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
 <br/>
 <body> - Then you must click on the Vehicle VIN button!</body>
</div>
<br/>
 <img src="https://i.imgur.com/0iyblCG.jpeg" alt="CarFax" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via License Plate: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
 <br/>
 <body> - Then you must click on the License Plate button!</body>
</div>
<br/>
 <img src="https://i.imgur.com/IHKZj5K.jpeg" alt="CarFax" width="350px">
</td>
</tr>





</td>
</tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>
</details>


<!-- GETTING STARTED -->
## Getting Started
<details close>
<summary><b>Installation Details</b></summary>
<br />

<b>1. Start the **ShopCarX** server:</b>
- Clone [server from the repo here](https://github.com/seanmodd/jamstack-final-backend/).
   ```sh
   git clone https://github.com/seanmodd/jamstack-final-backend.git
   ```
- Once you have cloned it locally, run <code>npm install</code> to install all the dependencies.
- Now run <code>npm run develop</code> to start the server, now the server should be live on localhost:1337!

<b>2. Start the **ShopCarX** frontend:</b>
- Clone this github repo to your local machine.
```sh
   git clone https://github.com/seanmodd/next12.git
   ```
- Once you have cloned it locally, ***you first must access branch vSean!*** 
- Only when you are on branch vSean, ***then*** you run <code>yarn install</code> to install all the dependencies.
- Now run <code>yarn run start</code> and you can visit the web app now live on localhost:3000!

</details>





<!-- Todo -->
## Todo

<summary><b>Likes Dashboard</b></summary>

- [ ] Create personal likes dashboard
  - [ ] Create an option to like a car from the dashboard/shop page 
  - [ ] Add a like button to the [makeName] page
  

<summary><b>Carfax Price Estimator</b></summary>

- [ ] Complete the carfax price estimator page on /dashboard/carfax-value with the 3 approaches to find out your car's value immediately
  - [x] Make and model carfax esitmator...
  - [x] VIN carfax estimator...
  - [ ] License Plate and state estimator...

<summary><b>Fully Featured Authentication Flow</b></summary>

- [ ] Create registration
  - [x] Verification required via email after registration with sendgrid or nodemailer...
- [ ] Create login
  - [x] If email already exists, notify the user of this...
- [ ] Create a reset password and trigger emails with sendgrid or nodemailer

<summary><b>Search Capability</b></summary>

- [ ] Create a search capability utilizing the search bar component which is already created

<summary><b>Automatically Request for Zip Code Access</b></summary>

- [ ] Ask for location access in the app in order to get the zip code

<summary><b>Completed Tasks</b></summary>

- [x] Integrate with minimals.cc template and update to utilize Next12
- [x] Fetch Data from Scraper that's connected to Strapi backend...
- [x] Extract VIN number from Scraper and fetch car features from calling CarXE API by searching up that VIN number the Scraper had retrieved...
- [x] Initialize firebase v8 for authentication
- [x] Establish valid registration
- [x] Establish a valid login capability
- [x] Create logout flow
- [x] Create a [makeName] subcategory through which every [id] is dynamically generated
- [x] Fetch all data using SSR rendering from Redux onto /dashboard/shop so it picks it up on ‘page inspect’ for SEO purposes...



<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Your Name - [@persiansean](https://twitter.com/@persiansean) - sean@senpex.com

Project Link: [https://github.com/seanmodd/next12/tree/vSean](https://github.com/seanmodd/next12/tree/vSean)

<p align="right">(<a href="#top">back to top</a>)</p>

