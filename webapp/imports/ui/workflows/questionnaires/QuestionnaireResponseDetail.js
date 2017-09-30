import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultQuestionnaireResponse = {
  resourceType: 'QuestionnaireResponse',
  code: {
    text: ""
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: 'tablet'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 30,
        unit: 'tablet'
      }
    }]
  }
};

Session.setDefault('questionnaireResponseUpsert', false);
Session.setDefault('selectedQuestionnaireResponse', false);


export default class QuestionnaireResponseDetail extends React.Component {
  getMeteorData() {
    let data = {
      questionnaireResponseId: false,
      questionnaireResponse: defaultQuestionnaireResponse
    };

    if (Session.get('questionnaireResponseUpsert')) {
      data.questionnaireResponse = Session.get('questionnaireResponseUpsert');
    } else {
      if (Session.get('selectedQuestionnaireResponse')) {
        data.questionnaireResponseId = Session.get('selectedQuestionnaireResponse');
        console.log("selectedQuestionnaireResponse", Session.get('selectedQuestionnaireResponse'));

        let selectedQuestionnaireResponse = QuestionnaireResponses.findOne({_id: Session.get('selectedQuestionnaireResponse')});
        console.log("selectedQuestionnaireResponse", selectedQuestionnaireResponse);

        if (selectedQuestionnaireResponse) {
          data.questionnaireResponse = selectedQuestionnaireResponse;
        }
      } else {
        data.questionnaireResponse = defaultQuestionnaireResponse;
      }

    }

    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let questionnaireResponseUpdate;

    if(process.env.NODE_ENV === "test") console.log("QuestionnaireResponseDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new questionnaireResponse
    if (Session.get('questionnaireResponseUpsert')) {
      questionnaireResponseUpdate = Session.get('questionnaireResponseUpsert');
    } else {
      questionnaireResponseUpdate = defaultQuestionnaireResponse;
    }



    // if there's an existing questionnaireResponse, use them
    if (Session.get('selectedQuestionnaireResponse')) {
      questionnaireResponseUpdate = this.data.questionnaireResponse;
    }

    switch (field) {
      case "questionnaireResponseName":
        questionnaireResponseUpdate.code.text = value;
        break;
      case "manufacturerDisplay":
        questionnaireResponseUpdate.manufacturer.display = value;
        break;
      case "questionnaireResponseForm":
        questionnaireResponseUpdate.product.form.text = value;
        break;
      case "activeIngredient":
        questionnaireResponseUpdate.product.ingredient[0].item.code.text = value;
        break;
      case "activeIngredientQuantity":
        questionnaireResponseUpdate.product.ingredient[0].instance[0].quantity = value;
        break;
      case "activeIngredientDescription":
        questionnaireResponseUpdate.product.ingredient[0].item.description = value;
        break;
      default:

    }


    // questionnaireResponseUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("questionnaireResponseUpdate", questionnaireResponseUpdate);

    Session.set('questionnaireResponseUpsert', questionnaireResponseUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('questionnaireResponseCardState');
    state["index"] = index;
    Session.set('questionnaireResponseCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="questionnaireResponseDetail">
        <CardText>
          <TextField
            id='questionnaireResponseNameInput'
            ref='questionnaireResponseName'
            name='questionnaireResponseName'
            floatingLabelText='QuestionnaireResponse Name'
            value={this.data.questionnaireResponse.code.text}
            onChange={ this.changeState.bind(this, 'questionnaireResponseName')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerDisplayInput'
            ref='manufacturerDisplay'
            name='manufacturerDisplay'
            floatingLabelText='Manufacturer'
            value={this.data.questionnaireResponse.manufacturer.display ? this.data.questionnaireResponse.manufacturer.display : ''}
            onChange={ this.changeState.bind(this, 'manufacturerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='questionnaireResponseFormInput'
            ref='questionnaireResponseForm'
            name='questionnaireResponseForm'
            floatingLabelText='Substance Form'
            value={this.data.questionnaireResponse.product.form.text}
            onChange={ this.changeState.bind(this, 'questionnaireResponseForm')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientInput'
            ref='activeIngredient'
            name='activeIngredient'
            floatingLabelText='Active Ingredient'
            value={this.data.questionnaireResponse.product.ingredient[0].item.code.text}
            onChange={ this.changeState.bind(this, 'activeIngredient')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientQuantityInput'
            ref='activeIngredientQuantity'
            name='activeIngredientQuantity'
            floatingLabelText='Quantity'
            value={this.data.questionnaireResponse.product.ingredient[0].instance[0].quantity}
            onChange={ this.changeState.bind(this, 'activeIngredientQuantity')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientDescriptionInput'
            ref='activeIngredientDescription'
            name='activeIngredientDescription'
            floatingLabelText='Active Ingredient Description'
            value={this.data.questionnaireResponse.product.ingredient[0].item.description}
            onChange={ this.changeState.bind(this, 'activeIngredientDescription')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.questionnaireResponseId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(questionnaireResponseId){
    if (questionnaireResponseId) {
      return (
        <div>
          <RaisedButton id="saveQuestionnaireResponseButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteQuestionnaireResponseButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveQuestionnaireResponseButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let questionnaireResponseUpdate = Session.get('questionnaireResponseUpsert', questionnaireResponseUpdate);

    if(process.env.NODE_ENV === "test") console.log("questionnaireResponseUpdate", questionnaireResponseUpdate);


    if (Session.get('selectedQuestionnaireResponse')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete questionnaireResponseUpdate._id;

      QuestionnaireResponses.update(
        {_id: Session.get('selectedQuestionnaireResponse')}, {$set: questionnaireResponseUpdate }, function(error) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('QuestionnaireResponse updated!', 'success');
            Session.set('questionnaireResponsePageTabIndex', 1);
            Session.set('selectedQuestionnaireResponse', false);
            Session.set('questionnaireResponseUpsert', false);
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new questionnaireResponse", questionnaireResponseUpdate);

      QuestionnaireResponses.insert(questionnaireResponseUpdate, function(error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('QuestionnaireResponse added!', 'success');
          Session.set('questionnaireResponsePageTabIndex', 1);
          Session.set('selectedQuestionnaireResponse', false);
          Session.set('questionnaireResponseUpsert', false);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removeQuestionnaireResponseById.call(
      {_id: Session.get('selectedQuestionnaireResponse')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('QuestionnaireResponse deleted!', 'success');
        Session.set('questionnaireResponsePageTabIndex', 1);
        Session.set('selectedQuestionnaireResponse', false);
        Session.set('questionnaireResponseUpsert', false);
      }
    });
  }
}


QuestionnaireResponseDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(QuestionnaireResponseDetail.prototype, ReactMeteorData);
