import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';


export class AboutAppCard extends React.Component {
  constructor(props) {
    super(props);
  }
getMeteorData() {
  let data = {
    style: {
      page:{
        minHeight: '0px'
      }
    }
  };


  // if (Session.get('hasPagePadding')) {
  //   data.style.page.minHeight = Session.get('appHeight') - 160 + 'px';
  //     // data.style.overflowY = "scroll";
  // } else {
  //   if (Session.get('mainPanelIsCard')) {
  //     data.style.page.minHeight = Session.get('appHeight') - 40 + 'px';
  //     // data.style.overflowY = "scroll";
  //   } else {
  //     data.style.page.minHeight = Session.get('appHeight') + 'px';
  //     // data.style.overflowY = "scroll";
  //   }
  // }

  return data;
}

  render(){
    var style = {
      marketingImage: {
        width: '80%',
        position: 'relative',
        left: '10%'
      },
      sectionHeader: {
        borderTop: '1px solid lightgray',
        width: '100%'
      },
      page: {
        minHeight: '1024px'
      }
    };

    return (
      <div>
        <CardTitle
          title="Features"
        />
         <CardText>

           <div style={this.data.style.page}>
             <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Aesthetics and Minimalist Design</h5><br />
             Experience a new paradigm of minimalist and aesthetic healthcare software, using Material Design, Paper, and Cards.  Streamline workflow with material metaphors, card layout, origami animations, and iconographic visual language.
             <br /><br />
             <img src="/marketing/AestheticDesign.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Patient Privacy Screens</h5><br />
             Ensure a higher level of patient privacy with glass blur, which keeps casual overlookers from reading a patient chart; and keeps you HIPAA compliant.  Supports SSL certificates for encryption over the wire.  Enterprise licenses of MongoDB support data-at-rest, for complete turnkey HIPAA solutions.
             <br /><br />
             <img src="/marketing/PrivacySettings.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Evidence Based Medicine</h5><br />
             Contextual research cards allow users to access the deep web for practicing evidence based medicine.  Practice evidence based medicine using decision trees, clinical guidelines, and best practices defined by the Department of Health and Human Services.
             <br /><br />
             <img src="/marketing/EvidenceBasedMedicine.png" style={style.marketingImage} />
             <br /><br />
             <img src="/marketing/DecisionTrees-ClinicalGuideLines.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>User Control and Freedom</h5><br />
             Allow users the freedom and control to theme their work environment to match their surroundings.  Eliminate wasted time spent resizing windows with origami card layout.
             <br /><br />
             <img src="/marketing/Theming.png" style={style.marketingImage} />
             <br /><br />
             <img src="/marketing/PersonalPreferences.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Centalized Notifications</h5><br />
             Prevent alert fatigue by consolidating alerts in a dedicated feed.  Review your notification history, and work through notifications as an ad-hoc dynamic task list.
             <br /><br />
             <img src="/marketing/Notifications.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>App Info & Environment Visibility</h5><br />
             Ensure that users always know which environment they’re in and what the status of the system.  Progress indicators, status indicators, and diagnostic info pages help staff and practitioners to diagnose
             <br /><br />
             <img src="/marketing/AppInfo.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Clinical Quality Control through Checklists</h5><br />
             Improve departmental quality control by using order sets, protocols, and checklists.  Embrace the Checklist Manifesto, and bring process engineering techniques from the aviation and nuclear energy industries to clinical engineering.
             <br /><br />
             <img src="/marketing/OrderSets.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Specificity & Sensitivity Analysis</h5><br />
             Analyze the specificity and sensitivty of clinical treatments and research studies using population health analysis tools.  Cross reference with PubMed articles, and generate epidemiology data through FHIR interface feeds.
             <br /><br />
             <img src="/marketing/SensitivitySpecificityAnalysis.png" style={style.marketingImage} />
             <br /><br />
           </div>


           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Error Prevention</h5><br />
             Prevent input errors with data input components such as DatePicker; and practice evidence based medicine by using peer-reviewed PickList.
             <br /><br />
             <img src="/marketing/PatientPickLists.png" style={style.marketingImage} />
             <br /><br />
             <img src="/marketing/ErrorRecoveryAlerts.png" style={style.marketingImage} />
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Standards & Compatibility</h5><br />

            Make a commitment to interoperability compliance using community testing frameworks such as Touchstone and Crucible.  Avoid reinventing the wheel when it comes to core healthcare schemas, and leverage the work of international working groups such as HL7.
            <br />
            <br />
            <img src="/marketing/TouchstoneTests.png" style={style.marketingImage} />
            <br /><br />

             We've implemented SimpleSchemas for 40 of the 100 defined FHIR Resources, including complete coverage of the ~20 resources that are supported by both Epic and Cerner.  Additionally, we have user interface implemented for 6 of those 17 commonly shared resources.  And we've completed Sprint 2 of the Argonaut Project.  We're also excited to announce that we are currently going into production at one facility, and are working on interoperability testing with the major EMR vendors.
             <br /><br />

             <b>FHIR Resource Schemas</b>
             <LinearProgress mode="determinate" value={40} max={100} color={blue500} />
             <br /><br />


             <b>Epic/Cerner Compatibility</b>
             <LinearProgress mode="determinate" value={20} max={20} color={blue500} />
             <br /><br />


             <b>Epic/Cerner User Interface</b>
             <LinearProgress mode="determinate" value={6} max={20} color={blue500} />
             <br /><br />


             <b>Argonaut</b>
             <LinearProgress mode="determinate" value={2} max={6} color={blue500} />
             <br /><br />


            Lastly, our commitment to standards includes using Meteor, the mostly widely used and popularized web application framework on GitHub.
            <br />
            <img src="/marketing/GitHubTopRanked.png" style={style.marketingImage} />
            <br /><br />

           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Keybindings & Accessibility</h5><br />
             There is a moral mandate to make healthcare accessible to everybody.  As such, accessibility features have been a part of Clinical Meteor since it's very first release.  Of particular importance is support for keybindings, which enable haptic interoperability.  While we have a completely library for programatic keybinding, we find the following keyboard shortcuts are particularly popular and often requested.
             <br /><br />
             <Table responses hover >
               <tbody>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+n</td>
                   <td>Hide/Show Navbars</td>
                 </tr>
                 <tr className='themingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+t</td>
                   <td>Theming Controls</td>
                 </tr>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+b</td>
                   <td>Left Offset</td>
                 </tr>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+m</td>
                   <td>Card Spacing</td>
                 </tr>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+p</td>
                   <td>Page Top/Bottom Spacing</td>
                 </tr>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+c</td>
                   <td>Display as Card</td>
                 </tr>
                 <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                   <td>ctrl+cmd+2</td>
                   <td>Meta/Context Sidebar</td>
                 </tr>
               </tbody>
             </Table>
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Get the Code</h5><br />
             <Link to='http://github.com/clinical-meteor/meteor-on-fhir'>http://github.com/clinical-meteor/meteor-on-fhir</Link>
             <br /><br />
           </div>

           <div style={this.data.style.page}>
             <h5 style={style.sectionHeader}>Licensing</h5><br />
               This software contains media assets which are licensed directly to Abigail Watson, and therefore may not be redistributed under MIT.  In general, feel free to copy the software itself, and modify it and use it for your own use.  When doing so, swap out all media assets.<br/>
               <CardHeader
                 avatar="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg"
                 title="Abigail Watson"
                 subtitle="Artistic License 2.0"
                 href="http://www.meteor.com"
               />
           </div>
         </CardText>
      </div>
    );
  }
}
ReactMixin(AboutAppCard.prototype, ReactMeteorData);
