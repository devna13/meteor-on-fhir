import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import { Tab, Tabs } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { Accounts } from 'meteor/accounts-base';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { FontIcon } from 'material-ui/FontIcon';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import Spacer from '/imports/ui/components/Spacer';
import TextField from 'material-ui/TextField';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { browserHistory } from 'react-router';
import { removeUserById } from '../../api/users/methods';

let defaultState = {
  index: 0,
  hasConfirmedDelete: false,
  wantsToDelete: false,
  increment: 0,
  confirm: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};
Session.setDefault('myProfileState', defaultState);

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {
        //opacity: Session.get('globalOpacity')
        tab: {
          borderBottom: '1px solid lightgray'
        },
        title: {
          left: '0px'
        },
        avatar: {
          position: 'absolute',
          zIndex: 10,
          display: 'inline-flex',
          borderRadius: '50%',
          transition: '1s'
        }
      },
      state: {
        index: 0,
        hasConfirmedDelete: false,
        wantsToDelete: false,
        confirmed: '',
        increment: 0,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      user: {
        _id: '',
        given: '',
        familiy: '',
        email: '',
        avatar: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: 'noAvatar.png',
        birthdate: ''
      },
      header: {
        avatar: 'noAvatar.png'
      }, 
      address: {
        line: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        latitude: '',
        longitude: '',
        latlng: '0.0, 0.0'
      }
    };

    data.style.tab = Glass.darkroom(data.style.tab);


    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: Meteor.user().profile.avatar
      };      
      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        data.user.profileImage = Meteor.user().profile.avatar;
        data.header.avatar = Meteor.user().profile.avatar;
      } else {
        data.user.profileImage = 'thumbnail.png';
        data.header.avatar = 'thumbnail.png';
      }

      if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
        data.user.given = Meteor.user().profile.name.given;
        data.user.family = Meteor.user().profile.name.family;
        data.user.fullName = Meteor.user().profile.name.given + ' ' + Meteor.user().profile.name.family;
      } else {
        data.user.given = '';
        data.user.family = '';
        data.user.fullName = '';
      }
      if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.locations  && Meteor.user().profile.locations.home && Meteor.user().profile.locations.home.address){
        if(Meteor.user().profile.locations.home.address.line){
          data.address.line = Meteor.user().profile.locations.home.address.line;
        }
        if(Meteor.user().profile.locations.home.address.city){
          data.address.city = Meteor.user().profile.locations.home.address.city;
        }
        if(Meteor.user().profile.locations.home.address.state){
          data.address.state = Meteor.user().profile.locations.home.address.state;
        }
        if(Meteor.user().profile.locations.home.address.postalCode){
          data.address.postalCode = Meteor.user().profile.locations.home.address.postalCode;
        }
        if(Meteor.user().profile.locations.home.address.country){
          data.address.country = Meteor.user().profile.locations.home.address.country;
        }
      }
      if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.locations  && Meteor.user().profile.locations.home && Meteor.user().profile.locations.home.position){
        if(Meteor.user().profile.locations.home.position.latitude && Meteor.user().profile.locations.home.position.longitude){
          data.address.latlng = Meteor.user().profile.locations.home.position.latitude + ', ' + Meteor.user().profile.locations.home.position.longitude;
        }

        // var latlngString = '';

        // if(Meteor.user().profile.locations.home.position.latitude){
        //   data.address.latlng = Meteor.user().profile.locations.home.position.latitude.toString() + ', ';
        // } else {
        //   data.address.latlng = '';
        // }
        // if(Meteor.user().profile.locations.home.position.longitude){
        //   data.address.latlng = data.address.latlng + Meteor.user().profile.locations.home.position.longitude.toString();
        // } else {
        //   data.address.latlng = '';          
        // }
        // data.address.latlng = latlngString;
        
      }

    }

    if (Session.get('appWidth') > 768) {
      data.style.avatar.height = '120px';
      data.style.avatar.width = '120px';
      data.style.avatar.left = '-120px';
      data.style.avatar.top = '-20px';
      data.style.avatar.position = 'absolute';
      data.style.avatar.zIndex = 10;
      data.style.title.left = '100px';
      //data.header.avatar = null;
    } else {
      //data.style.avatar.display = 'none';
      data.style.avatar.height = '50px';
      data.style.avatar.width = '50px';
      data.style.avatar.left = '-50px';
      data.style.avatar.top = '15px';
      data.style.title.left = '70px';
    }

    if(process.env.NODE_ENV === "test") console.log("MyProfilePage[data]" , data);
    return data;
  }


  render(){
    return(
      <div id='myProfilePage'>
        <VerticalCanvas>
          <GlassCard>
              <CardHeader
                title={this.data.user.fullName}
                subtitle={this.data.user.email}
                style={this.data.style.title}
              >
              <img id='avatarImage' ref='avatarImage' src={this.data.user.profileImage} onError={this.imgError.bind(this)} style={this.data.style.avatar} />
              </CardHeader>
            <CardText>
              <Tabs id="profilePageTabs" index={this.data.state.index} onChange={this.handleTabChange} initialSelectedIndex={this.data.state.index} value={this.data.state.index} >

                <Tab className='demographicsTab' label='Demographics' style={this.data.style.tab} value={0} >
                  <div id='profileDemographicsPane' style={{position: 'relative'}}>
                    <Row>
                      <Col md={6}>
                        <TextField
                          id='givenNameInput'
                          ref='given'
                          name='given'
                          type='text'
                          floatingLabelText='given name'
                          value={this.data.user.given}
                          fullWidth
                          /><br/>
                      </Col>
                      <Col md={6}>
                        <TextField
                          id='familyNameInput'
                          ref='family'
                          name='family'
                          type='text'
                          floatingLabelText='family name'
                          value={this.data.user.family}
                          fullWidth
                          /><br/>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <TextField
                          id='birthdateInput'
                          ref='birthdate'
                          name='birthdate'
                          type='date'
                          floatingLabelText='date of birth (yyyy-mm-dd)'
                          floatingLabelFixed={true}
                          value={this.data.user.birthdate}
                          fullWidth
                          /><br/>
                      </Col>
                      <Col md={3}>
                        <TextField
                          id='genderInput'
                          ref='gender'
                          name='gender'
                          type='text'
                          floatingLabelText='gender'
                          value={this.data.user.gender}
                          // onChange={ this.handleChangeAvatar.bind(this) }
                          fullWidth
                          /><br/>

                      </Col>
                      <Col md={6}>
                        <TextField
                          id='avatarInput'
                          ref='avatar'
                          name='avatar'
                          type='text'
                          floatingLabelText='avatar'
                          value={this.data.user.avatar}
                          onChange={ this.handleChangeAvatar.bind(this) }
                          fullWidth
                          /><br/>

                      </Col>
                    </Row>
                  </div>
                </Tab>



                <Tab className='passwordTab' label='Password' style={this.data.style.tab} value={2} >
                  <div id='profilePasswordPane' style={{position: 'relative'}} >
                    <TextField
                      id='oldPasswordInput'
                      ref='oldPassword'
                      name='oldPassword'
                      type='text'
                      floatingLabelText='oldPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.oldPassword}
                      onChange={ this.rememberOldPassword.bind(this) }
                      fullWidth
                      /><br/>
                    <TextField
                      id='newPasswordInput'
                      ref='newPassword'
                      name='newPassword'
                      type='text'
                      floatingLabelText='newPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.newPassword}
                      onChange={ this.rememberNewPassword.bind(this) }
                      fullWidth
                      /><br/>
                    <TextField
                      id='confirmPasswordInput'
                      ref='confirmPassword'
                      name='confirmPassword'
                      type='text'
                      floatingLabelText='confirmPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.confirmPassword}
                      onChange={ this.rememberConfirmPassword.bind(this) }
                      fullWidth
                      /><br/>

                    <RaisedButton
                      id='changePasswordButton'
                      label='Change Password'
                      onClick={this.changePassword.bind(this)}
                      className="muidocs-icon-action-delete"
                      primary={true}
                      />
                  </div>
                </Tab>

                <Tab className="systemTab" label='Preferences' style={this.data.style.tab} value={3}>
                  <div id="profileSystemPane" style={{position: "relative"}}>
                    <Table>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>>
                      <TableRow>
                        <TableRowColumn style={{width: '200px'}}>
                          <FlatButton label='Show Navbars' />
                        </TableRowColumn>
                        <TableRowColumn>Display the header and footer navbars.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Show Search' />
                        </TableRowColumn>
                        <TableRowColumn>Display the search ribbon.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Autoheight' />
                        </TableRowColumn>
                        <TableRowColumn>Fit to use the available spaec.  Otherwise, use veritical scroll.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Margins' />
                        </TableRowColumn>
                        <TableRowColumn>Layout with or without border margins.</TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Card/Panel' />
                        </TableRowColumn>
                        <TableRowColumn>Card layout or Panel layout</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Secondary' />
                        </TableRowColumn>
                        <TableRowColumn>Display the secondary iframe panel</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Docks' />
                        </TableRowColumn>
                        <TableRowColumn>Display inbox dock</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Narrow Navs' />
                        </TableRowColumn>
                        <TableRowColumn>Use narrow navbars</TableRowColumn>
                      </TableRow>
                    </TableBody>
                    </Table>

                    <br />
                    <br />
                    { this.renderConfirmDelete(this.data.state.wantsToDelete) }
                  </div>
                </Tab>

              </Tabs>

            </CardText>
          </GlassCard>

          <Spacer />
          <GlassCard>
            <CardTitle title="Home Address" subtitle='last updated: yyyy/mm/dd' style={{float: 'left'}} />
            <CardTitle subtitle={this.data.address.latlng} style={{position: 'relative', right: '0px', top: '0px', float: 'right'}}/>
            <CardText>
              
              <Row>
                <Col md={12}>
                  <TextField
                    id='streetAddressInput'
                    ref='streetAddress'
                    name='streetAddress'
                    type='text'
                    floatingLabelText='Street Address'
                    floatingLabelFixed={true}                    
                    value={this.data.address.line}
                    onChange={ this.changeHomeStreetAddress.bind(this) }
                    fullWidth
                    />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <TextField
                    id='cityInput'
                    ref='city'
                    name='city'
                    type='text'
                    floatingLabelText='City'
                    floatingLabelFixed={true}
                    value={this.data.address.city}
                    onChange={ this.changeHomeCity.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='stateInput'
                    ref='state'
                    name='state'
                    type='text'
                    floatingLabelText='State'
                    floatingLabelFixed={true}
                    value={this.data.address.state}
                    onChange={ this.changeHomeState.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='postalCodeInput'
                    ref='postalCode'
                    name='postalCode'
                    type='text'
                    floatingLabelText='Postal Code'
                    floatingLabelFixed={true}
                    value={this.data.address.postalCode}
                    onChange={ this.changeHomeZip.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='countryInput'
                    ref='country'
                    name='country'
                    type='text'
                    floatingLabelText='Country'
                    floatingLabelFixed={true}
                    value={this.data.address.country}
                    onChange={ this.changeHomeCountry.bind(this) }
                    fullWidth
                    />
                </Col>
              </Row>
            </CardText>
            <CardActions>
              <FlatButton 
                label='Geocode' 
                onClick={this.geocode.bind(this)}
                />
            </CardActions>
          </GlassCard>



          <Spacer />
          <GlassCard>
            <CardTitle title="Resources" subtitle='Healthcare data is attached to your profile via resources.' />
            <CardText>
              ---
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
  imgError() {
    this.refs.avatarImage.src = '/noAvatar.png';
  }
  renderConfirmDelete(wantsToDelete){
    if (wantsToDelete) {
      return(
        <div>
          <br />
          <br />
          <TextField
            id='confirmInput'
            ref='confirm'
            name='confirm'
            type='text'
            floatingLabelText='confirm email or _id'
            defaultValue={this.data.user.confirm}
            onChange={this.handleConfirm.bind(this)}
            /><br/><br/>

          <RaisedButton
            id='confirmDeleteUserButton'
            label='Confirm Delete'
            onClick={this.confirmDelete.bind(this) }
            className="muidocs-icon-action-delete"
            primary={true}
            style={{backgroundColor: 'red'}}
            />
        </div>
      );
    } else {
      return(
        <div>
          <Divider />
          <br />
          <RaisedButton id='resetPreferencesButton' label='Reset Preferences' onClick={this.resetPreferences } primary={true} style={{marginRight: '20px'}} />
          <RaisedButton id='deleteUserButton' className="muidocs-icon-action-delete" label='Delete User' onClick={this.handleDelete } primary={true} />
        </div>
      );
    }
  }
  resetPreferences(){
    //alert('reset!')
  }
  rememberOldPassword(event, value){
    let state = Session.get('myProfileState');
    state['oldPassword'] = value;
    Session.set('myProfileState', state);
  }
  rememberNewPassword(event, value){
    let state = Session.get('myProfileState');
    state['newPassword'] = value;
    Session.set('myProfileState', state);
  }
  rememberConfirmPassword(event, value){
    let state = Session.get('myProfileState');
    state['confirmPassword'] = value;
    Session.set('myProfileState', state);
  }
  changeState(field){
    let state = Session.get('myProfileState');
    state[field] = this.refs[field].refs.input.value;
    Session.set('myProfileState', state);
  }
  handleTabChange(index) {
    let state = Session.get('myProfileState');
    state.index = index;
    Session.set('myProfileState', state);
  }

  handleChangeAvatar(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.avatar': value
    }});
  }
  changeHomeStreetAddress(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.line': value
    }});
  }
  changeHomeCity(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.city': value
    }});
  }
  changeHomeState(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.state': value
    }});
  }
  changeHomeZip(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.postalCode': value
    }});
  }
  changeHomeCountry(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.country': value
    }});
  }
  geocode(){
    console.log('lets try geocoding something...');
    var user = Meteor.user();
    if(user && user.profile && user.profile.locations && user.profile.locations.home && user.profile.locations.home.address ){
      Meteor.call('geocode', user.profile.locations.home.address);
    }
  }
  handleDelete() {
    let state = Session.get('myProfileState');
    state.wantsToDelete = true;
    Session.set('myProfileState', state);
  }
  handleConfirm(event, value) {
    let state = Session.get('myProfileState');
    state.confirm = value;
    Session.set('myProfileState', state);
  }
  confirmDelete() {
    let state = Session.get('myProfileState');

    // janky, but it works, i guess
    if ((state.confirm === Meteor.userId()) || (state.confirm === Meteor.user().emails[0].address)) {
      if(process.env.NODE_ENV === "test") console.log('Confirm _id match.  Removing.');

      removeUserById.call({
        _id:  Meteor.userId()
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User removed!', 'success');
          browserHistory.push('/signin');
        }
      });
    } else {
      console.log('Hmmm...  yeah, lets wait a bit and make sure we have the right user.');
    }
  }
  changePassword() {
    let state = Session.get('myProfileState');
    if (state.newPassword === state.confirmPassword) {
      console.log('Passwords match.  Lets send to the server and make it official.');

      Accounts.changePassword(state.oldPassword, state.newPassword, function(error, result){
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Password changed!', 'success');

          let state = Session.get('myProfileState');
          state.newPassword = '';
          state.oldPassword = '';
          state.confirmPassword = '';
          Session.set('myProfileState', state);
        }
      });

    } else {
      console.log("Passwords don't match.  Please try again.");
      Bert.alert("Passwords don't match.  Please try again.", 'danger');
    }
  }
}



ReactMixin(MyProfilePage.prototype, ReactMeteorData);
