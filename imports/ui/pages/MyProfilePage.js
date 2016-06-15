import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import Button from 'react-toolbox/lib/button';
import { Image } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Input from 'react-toolbox/lib/input';

import { getInputValue } from '../../modules/get-input-value';
import { removeUser } from '../../api/users/methods';

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

let defaultState = {
  index: 0,
  hasConfirmedDelete: false,
  wantsToDelete: false,
  increment: 0,
  confirm: ""
}
Session.setDefault('myProfileState', defaultState);

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  };

  handleTabChange(index) {
    let state = Session.get('myProfileState');
    state.index = index;
    Session.set('myProfileState', state);
  };

  handleActive() {
    //console.log('Special one activated');
  };
  handleChangeAvatar() {
    console.log('Lets change the avatar...');
  };
  handleDelete(component) {
    let state = Session.get('myProfileState');
    state.wantsToDelete = true;
    Session.set('myProfileState', state);
  };
  handleConfirm() {
    let state = Session.get('myProfileState');
    state.confirm = this.refs.confirm.refs.input.value;
    Session.set('myProfileState', state);
  };
  confirmDelete() {
    // janky, but it works, i guess
    if (this.refs.confirm.refs.input.value === Meteor.userId()) {
      console.log('Confirm delete the user.  Lets do this thing.');

      removeUser.call({
        _id:  Meteor.userId()
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User removed!', 'success');
          browserHistory.push('/login');
        }
      });
    } else {
      console.log("Hmmm...  yeah, lets wait a bit and make sure we have the right user.");
    }
  };
  renderConfirmDelete(wantsToDelete){
    if (wantsToDelete) {
      return(
        <div>
          <br />
          <br />
          <Input
            type='text'
            label='confirm id to delete (e.g. rmmkcyxvqx5Mfy23J)'
            name='confirm'
            ref="confirm"
            style={this.data.style}
            value={this.data.state.confirm}
            onChange={this.handleConfirm.bind(this)}
            floating
            style={{color: "red"}}
            />
          <Button
            icon="delete"
            label="Confirm Delete"
            onMouseUp={this.confirmDelete.bind(this) }
            raised
            primary
            style={{backgroundColor: "red"}}
            />
        </div>
      )
    } else {
      return(
        <Button icon="delete" label="Delete User" onClick={this.handleDelete} raised primary />
      )
    }
  };
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        index: 0,
        hasConfirmedDelete: false,
        wantsToDelete: false,
        confirmed: "",
        increment: 0
      },
      user: {
        given: "",
        familiy: "",
        email: "",
        avatar: "",
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: "thumbnail.png",
        birthdate: ""
      }
    }

    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: Meteor.user().profile.avatar
      }
      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        data.user.profileImage = Meteor.user().profile.avatar;
      } else {
        data.user.profileImage = "thumbnail.png";
      }

      if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
        data.user.given = Meteor.user().profile.name.given;
        data.user.family = Meteor.user().profile.name.family;
        data.user.fullName = Meteor.user().profile.name.given + " " + Meteor.user().profile.name.family;
      } else {
        data.user.given = "";
        data.user.family = "";
        data.user.fullName = "";
      }
    }

    //console.log("data", data);

    return data;
  };


  render(){
    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <hr />
            <Grid>
              <Col xs={6} md={4} lg={2}>
                <Image src={this.data.user.profileImage} responsive style={{width: "100%"}}/>
              </Col>
              <Col xs={12} md={8} lg={10}>
                <CardTitle
                  title={this.data.user.fullName}
                  subtitle={this.data.user.email}
                />
                <Tabs index={this.data.state.index} onChange={this.handleTabChange}>

                  <Tab label='Demographics'>
                    <div style={{position: "relative"}}>
                      <Input type='text' label='given name' ref="given" name='given' style={this.data.style} value={this.data.user.given} />
                      <Input type='text' label='family name' ref="family" name='family' style={this.data.style} value={this.data.user.family} />
                      <Input type='text' label='date of birth (yyyy-mm-dd)' ref="birthdate" name='birthdate' style={this.data.style} value={this.data.user.birthdate} />
                      <Input type='text' label='avatar' ref="avatar" name='avatar' style={this.data.style} value={this.data.user.avatar} onKeyUp={ this.handleChangeAvatar }/>
                    </div>
                  </Tab>
                  <Tab label='Medical History'>
                    <div style={{position: "relative"}}>
                    </div>

                  </Tab>
                  <Tab label='Environmental' onActive={this.handleActive}>
                    <div style={{position: "relative"}} >
                      <Input type='text' label='zipcode' name='zipcode' ref="zipcode" style={this.data.style} value={this.data.user.zip} />
                      <Input type='text' label='latitude' name='latitude' ref="latitude" style={this.data.style} value={this.data.user.latitude} />
                      <Input type='text' label='longitude' name='longitude' ref="longitude" style={this.data.style} value={this.data.user.longitude} />
                    </div>

                  </Tab>
                  <Tab label='System'>
                    <div style={{position: "relative"}}>
                      <Input disabled type='text' label='symptomatic i.d.' name='_id' style={this.data.style} value={this.data.user._id} />
                      <Input disabled type='text' label='email' name='email' style={this.data.style} value={this.data.user.email} />

                      { this.renderConfirmDelete(this.data.state.wantsToDelete) }
                    </div>

                  </Tab>
                </Tabs>
              </Col>
            </Grid>
            <Spacer />


          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


MyProfilePage.propTypes = {};
MyProfilePage.defaultProps = {};
ReactMixin(MyProfilePage.prototype, ReactMeteorData);