  import React, { Component } from 'react';
  import Textarea from './Textarea.js';
  import Input from './Input.js';
  import NumberInput from './NumberInput.js';
  import Services from './Services.js';
  import Projects from './Projects.js';
  import Customer from './Customer.js';
  import DragNDrop from './DragnDrop.js';
  import SocialMedia from './SocialMedia.js';


  import { initializeApp } from 'firebase/app';
  import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDCV41Ps6VYURxNC2ZcZnbKCVJRFvJNoxE",
    authDomain: "automated-portfolio-website.firebaseapp.com",
    projectId: "automated-portfolio-website",
    storageBucket: "automated-portfolio-website.appspot.com",
    messagingSenderId: "642956010715",
    appId: "1:642956010715:web:437988a6dde09b75d418fe",
    measurementId: "G-6V960KB4QH"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, "gs://automated-portfolio-website.appspot.com/");


  class Form extends Component {

    constructor(props) {
      super(props);
      this.state = {
        title: '',
        aboutText: '',
        aboutFoto: '',
        email: '',
        phoneNumber: '',
        colorBool: '',
        mainColor: '#fff',
        secondaryColor: '#222',
        accentColor: '#aa2211',
        backgroundColor: '#f00',
        metaDescription: 'Buy Number Stickers which i produce for u in person',
        amoutOfProjects: 0,
        amoutOfServices: 0,
        amoutOfCustomers: 0,
      };
    }



    changeStateAmoutOfProjects = (newValue) => {
      this.setState({ amoutOfProjects: newValue })
    }

    changeStateAmoutOfServices = (newValue) => {
      this.setState({ amoutOfServices: newValue })
    }

    changeStateAmoutOfCustomers = (newValue) => {
      this.setState({ amoutOfCustomers: newValue })
    }


    handleSubmit = (event) => {
      let jsonContent = {
        general: {},
        colors: {},
        projects: {},
        services: {},
        customers: {},
        socialMedia: {}
      }

      const images = [];

      event.preventDefault();
      console.log('Form submitted:', this.state);

      let inputs = document.querySelectorAll("input");

      try {
        // general
        let aboutText = document.querySelector(".generalClassSortingTextArea");
        let aboutFoto = document.querySelector(".mainIMGINPUT");
        let logo = document.querySelector(".logoIMGINPUT");

        jsonContent.general["aboutText"] = aboutText.value;
        jsonContent.general["aboutFoto"] = aboutFoto.files[0].name? aboutFoto.files[0].name: "No Img avaible" ;
        jsonContent.general["logo"] = logo.files[0].name? logo.files[0].name: "No Img avaible" ;

        if(aboutFoto.files[0]) images.push([aboutFoto.files[0].name, aboutFoto.files[0]]);
        if(logo.files[0]) images.push([logo.files[0].name, logo.files[0]]);
        
      } catch (error) {
        console.log(error)
      }
      
      inputs.forEach(input =>{
        console.log(input)

        // general setup
        if(input.classList.contains("generalClassSorting")){
          jsonContent.general[input.name] = input.value;
        }

        // colors setup 
        if(input.classList.contains("inputBoolFocused") && input.value === "Yes"){

          let colorSpans = document.querySelectorAll(".colorPickerSpanSorting");

          jsonContent.colors["mainColor"] = colorSpans[0].innerHTML;
          jsonContent.colors["secondaryColor"] = colorSpans[1].innerHTML;
          jsonContent.colors["accentColor"] = colorSpans[2].innerHTML;
          jsonContent.colors["backgroundColor"] = colorSpans[3].innerHTML;
        }

        if(input.classList.contains("socialMediaSorting")){
          jsonContent.socialMedia[input.name] = input.value;
        }
      });

      // projects set up 
      if(this.state.amoutOfProjects > 0){
        for(let index = 0; index <  this.state.amoutOfProjects; index++){
          let project = document.querySelectorAll(`.projectsClassNameSorting${index}`)
          let projectInput = document.querySelector(`.projectsClassNameSorting${index}INPUT`)
          jsonContent.projects[index] = {
            "title": project[0].value,
            "text": project[1].value,
            "foto": projectInput.files[0] ? projectInput.files[0] : "No img avaible"           
          }

        if(projectInput.files[0]){
          images.push([projectInput.files[0].name, projectInput.files[0]]);
        }

        }
      }

      // services set up 
      if(this.state.amoutOfServices > 0){
        for(let index = 0; index <  this.state.amoutOfServices; index++){
          let service = document.querySelectorAll(`.servicesClassNameSorting${index}`)
          let serviceInput = document.querySelector(`.servicesClassNameSorting${index}INPUT`)
          jsonContent.services[index] = {
            "title": service[0].value,
            "text": service[1].value,
            "foto": serviceInput.files[0] ? serviceInput.files[0] : "No Img avaible"
          }

          if(serviceInput.files[0]) images.push([serviceInput.files[0].name, serviceInput.files[0]]);

        }
      }

      // customers set up 
      if(this.state.amoutOfCustomers > 0){
        for(let index = 0; index <  this.state.amoutOfCustomers; index++){
          let customer = document.querySelectorAll(`.customersClassNameSorting${index}`)
          let customerInput = document.querySelector(`.customersClassNameSorting${index}INPUT`)
          jsonContent.customers[index] = {
            "title": customer[0].value,
            "foto": customerInput.files[0] ? customerInput.files[0] :  "No Img avaible"
          }

         if(customerInput.files[0]) images.push([customerInput.files[0].name, customerInput.files[0]]);

        }
      }



      console.log(jsonContent)

      const timestamp = Date.now(); // Get the current timestamp
      const uniqueFilename = `data_${timestamp}.json`;

      console.log(storage)

      const storageRef = ref(storage, uniqueFilename);
      const fileBlob = new Blob([JSON.stringify(jsonContent)], { type: 'application/json' });

      
       uploadBytes(storageRef, fileBlob)
        .then((snapshot) => {
          console.log('File successfully created and uploaded.');
          // You can get the download URL if needed
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log('Download URL:', downloadURL);
        })
        .catch((error) => {
          console.error('Error creating and uploading file:', error);
        });

        console.log(images)

        images.forEach((imageUrl) => {
          const file = imageUrl[1];
          const fileName = `${imageUrl[0]}`;

          console.log(imageUrl)

          const storageRef = ref(storage, fileName);

          uploadBytes(storageRef, file)
            .then((snapshot) => {
              console.log(`Image ${fileName} uploaded successfully.`);
              // You can get the download URL if needed
              getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
              console.log(`Download URL for ${fileName}:`, downloadURL);
            })
            .catch((error) => {
              console.error(`Error uploading ${fileName}:`, error);
            });
        });
      };

    renderProjects = () => {
      const projects = [];
      if(this.state.amoutOfProjects > 20){
        this.setState({ amoutOfProjects: 20 })
      }

      for (let i = 0; i < parseInt(this.state.amoutOfProjects); i++) {
        projects.push(<Projects key={`project_${i}`} className={`projectsClassNameSorting${i}`}/>);
      }
      return projects;
    }

    renderServices = () => {
      const services = [];
      if(this.state.amoutOfServices > 20){
        this.setState({ amoutOfServices: 20 })
      }

      for (let i = 0; i < parseInt(this.state.amoutOfServices); i++) {
        services.push(<Services key={`service_${i}`} index={i} className={`servicesClassNameSorting${i}`}/>);
      }
      return services;
    }

    renderCustomers = () => {
      const customers = [];
      if(this.state.amoutOfCustomers > 20){
        this.setState({ amoutOfCustomers: 20 })
      }

      for (let i = 0; i < parseInt(this.state.amoutOfCustomers); i++) {
        customers.push(<Customer key={`customer_${i}`} index={i} className={`customersClassNameSorting${i}`}/>);
      }
      return customers;
    }

    render() {
      return (
        <form className="mainForm" onSubmit={this.handleSubmit}>
          <div className='formContainer'>
            
            <h2 className="subFormHeading" id="GeneralID">
              General
            </h2>
            <Input name="title" labelContent="Name / Company name:" required="true" className={"generalClassSorting"}/>
            <Textarea name="aboutText" labelContent="Introduction Text about:" required="true" className={"generalClassSortingTextArea"}/>
            <DragNDrop key="general_1" name="of you or your team" className={"mainIMG"}/>
            <DragNDrop key="general_2" name="to represent your Logo" className={"logoIMG"}/>

            <Input name="email" labelContent="Provide your Email:" type="email" className={"generalClassSorting"}/>
            <Input name="phoneNumber" labelContent="Provide your phone number:" type="number" className={"generalClassSorting"}/>

            <h2 className="subFormHeading" id="ColorsID">
              Colors
            </h2>
            <Input name="colorBool" labelContent="Would you like to define colors for your website?" type="bool"/>   

            <h2 className="subFormHeading" id="ProjectID">
              Projects
            </h2>
            <NumberInput name="amoutOfProjects" labelContent='How many projects do you want to have on your website? (20 max)' changeState={this.changeStateAmoutOfProjects}/>
  
            {/* Projects render by Number of prior input */}
            {(this.renderProjects())}
            
            <h2 className="subFormHeading" id="ServiceID">
              Services
            </h2>      
            <NumberInput name="amoutOfServices" labelContent='How many services do you want to have on your website? (20 max)' changeState={this.changeStateAmoutOfServices}/>

            {/* Services render by Number of prior input */}
            {(this.renderServices())}

            <h2 className="subFormHeading" id="CustomerID">
              Customer
            </h2>      
            <NumberInput name="amoutOfCustomers" labelContent='Do you want to add a list of customers to your website? (20 max)' changeState={this.changeStateAmoutOfCustomers}/>

            {/* Services render by Number of prior input */}
            {(this.renderCustomers())}

            <h2 className="subFormHeading" id="SocialMediaID">
              Social Media
            </h2> 

            <SocialMedia changeSocialMedia={this.changeSocialMedia}/>


            <button className="submitButtonMainForm" type="submit">Submit</button>
          </div>
        </form>
      );
    }
  }

  export default Form;

