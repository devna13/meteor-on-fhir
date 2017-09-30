# Meteor on FHIR
For my Masters of Science in Biomedical Informatics, we are required to create a Capstone Project.  So I decided to write a Health Information Exchange infrastructure.  The technical infrastructure uses MongoDB (a modern hierarchical database, similar to the MUMPS/Cache database what Epic uses), a full-stack isomorphic javascript framework called [Meteor](https://www.meteor.com/), and Facebook's user interface layer React.  The HIE uses a wordpress business model, and is intended to be a distributed and federated peer-to-peer network.  We use [HL7 Fast Healthcare Interoperability Resources (FHIR)](https://www.hl7.org/fhir/) for data exchange and interoperability.  

[![CircleCI](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master)  


![https://github.com/clinical-meteor/meteor-on-fhir/blob/master/media/screenshot-1.png](https://github.com/clinical-meteor/meteor-on-fhir/blob/master/media/screenshot-1.png)

Yes, the above is a live screenshot of the app, which supports a theming engine and an augmented reality interface.

#### A. Installation  

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir
cd meteor-on-fhir/webapp

# #install dependencies
# meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box

# install the app
meteor npm install
```


#### B. Running Local

```sh
## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor

## general development
NODE_ENV=test INITIALIZE=true Patients=true Practitioners=true meteor --settings settings.dev.json
```


#### C. Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
cd meteor-on-fhir/webapp

## install test tools
git clone https://github.com/awatson1978/meteor-on-fhir-validation tests/nightwatch

## install test tools
meteor npm install

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```

#### D. Theme and Remove Licensed Media Assets
Edit the `settings.dev.json` file, and update:
```
{
  "public": {
    "title": "Rainbow's End Nursing Home Health Exchange",
    "theme": {
      "backgroundImagePath": "/backgrounds/medical/Gradient.jpg",
      "backgroundColor": "#34B6C2",
      "palette": {
        "colorA": "#34B6C2",
        "colorB": "#177AB9",
        "colorC": "#31323C",
        "colorD": "#710A4A",
        "colorE": "#FFFFFF"
      }
    },
    "meshNetwork": {
      "upstreamSync": "http://meteor-on-fhir.meteorapp.com/fhir-3.0.0", 
      "autosync": false
    }    
  },
  "private": {
    "practitionerAccessCode": "practitionerAccessCode",
    "sysadminAccessCode": "sysadminAccessCode"
  },
  "galaxy.meteor.com": {
    "env": {
      "MONGO_URL": "mongodb://username:password@mlab.com:25389/my-org-exchange-db",
      "NODE_ENV": "produciton"
    }
  }  
}
```

Run the script to remove restricted media assets:
```
scripts/remove_restricted_media_assets.sh
```

#### E. Deploy to Production  

```sh
TIMEOUT_SCALE_FACTOR=10 DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy my-org-exchange.meteorapp.com --settings settings.dev.json
```   

#### F. Mobile Build   

```sh
# development
# this can be tricky, because http://localhost:3000 may need to be a local IP address
# you may need to use `ifconfig` to find that address
# beware network isolation, and make sure your phone and workstation are on the same network
NODE_ENV=dev meteor run ios-device --mobile-server http://localhost:3000 --settings settings.dev.json

# production
# we need to specify the production server
NODE_ENV=dev meteor run ios-device --mobile-server http://meteor-on-fhir.meteorapp.com --settings settings.dev.json
```    


#### G. Desktop Build   
To enable desktop builds, uncomment the following files in `.meteor/packages`.

- [ ] omega:meteor-desktop-watcher@=0.2.6
- [ ] omega:meteor-desktop-bundler@=0.2.6
- [ ] omega:meteor-desktop-localstorage@=0.0.11
- [ ] shell-server

For more info, see [https://www.npmjs.com/package/meteor-desktop](https://www.npmjs.com/package/meteor-desktop)

```sh
# add the .desktop directory, which has files needed by omega:meteor-desktop
npm run desktop -- init

# run the app locally, as if you were doing a mobile build
# (you may be able to just use the running mobile build server)
NODE_ENV=dev meteor --mobile-server http://localhost:3000 --settings settings.dev.json

# then run the desktop build
npm run desktop

# or try the shortcut script
 meteor npm run-script desktop
```    


#### H. Synchronizing With Other Datalakes  

To enable network synchronizing, you'll need to specify an upstream sync partner in your `settings.json` file.  Afterwards, you can enable manual synchronization in the **Data Management* page.  

```javascript
{
  "public": {
    "meshNetwork": {
      "upstreamSync": "http://meteor-on-fhir.meteorapp.com/fhir-3.0.0", 
      "autosync": false
    },
  }
}
```

#### I. Connect to an External EMR   
[HL7 v2 to FHIR Interface Mapping](https://medium.com/@awatson1978/hl7-v2-to-fhir-interface-mapping-f83c6ecf6bee)  



### References

#### Miscellaneous Notes  
- CarePlans can be complicated.  At the current time, they're very much an advanced feature and don't ship completed and ready to use out of the box.  Expect to have to implement your own careplan.  It's best to turn the careplan module off in the settings.json file until you have the time to implement custom careplan logic.  



#### Miscellaneous References    
[Supporting Interoperability – Terminology, Subsets and Other Resources from Natl. Library of Medicine](https://www.nlm.nih.gov/hit_interoperability.html)  
[Health IT Standards for Health Information Management Practices](http://ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_WP_HITStdsforHIMPratices_Rev1.1_2015-09-18.pdf)  







#### Mapping  
[Snazzy Maps](https://snazzymaps.com/style/13/neutral-blue)  
[Google Maps Utility Library](https://code.google.com/archive/p/google-maps-utility-library-v3/wikis/Libraries.wiki)  
[Map Icons](http://map-icons.com/)  
[Styling Wizard](https://mapstyle.withgoogle.com/)  
[GoogleMapReact Documentation](https://github.com/istarkov/google-map-react)  
[GoogleMapReact API](https://github.com/istarkov/google-map-react/blob/master/API.md)  
[Google Transit Layer](https://developers.google.com/maps/documentation/javascript/examples/layer-transit)  
[Google Traffic Layer](https://developers.google.com/maps/documentation/javascript/examples/layer-traffic)  

