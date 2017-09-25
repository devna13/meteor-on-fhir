import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Mousetrap } from 'meteor/clinical:keybindings';
import { Session } from 'meteor/session';
// global imports for subscriptions
import { MyGenotype as _MyGenotype } from '/imports/api/genotype/MyGenotype';
// global imports for subscriptions
import { Posts as _Posts } from '/imports/api/posts/posts';
// global imports for subscriptions
import { Statistics as _Statistics } from '/imports/api/statistics/statistics';
// global imports for subscriptions
import { Topics as _Topics } from '/imports/api/topics/topics';

if (process.env.NODE_ENV === 'production') {
  Bert.defaults.style = 'fixed-top';
} else {
  Bert.defaults.style = 'growl-top-right';
}

Session.setDefault('showOrbital', false);

Meteor.startup(function (){
  // global session variables
  Session.set('showNavbars', true);
  Session.set('showSearchbar', false);
  Session.set('hasPagePadding', true);
  Session.set('appSurfaceOffset', true);
  Session.set('selectedChromosome', 1);
  Session.set('showOrbital', false);


  // subscriptions that aren't provided via packages
  Meteor.subscribe('posts');
  Meteor.subscribe('topics');

  //Meteor.subscribe('Lists');
  Meteor.subscribe('Statistics');
  Meteor.subscribe('MyGenotype', Session.get('selectedChromosome'));

  Meteor.subscribe('Observations');
  Meteor.subscribe('Patients');

  // keybindings 

});


//-----------------------------------------------------------------------------
// Global Objects



  // Core 
  Statistics = _Statistics;
  DynamicRoutes = [];

  // Social Network
  Posts = _Posts;
  Topics = _Topics;

  // Premium Modules
  MyGenotype = _MyGenotype;
  