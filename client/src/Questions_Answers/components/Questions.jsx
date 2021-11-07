import React from 'react';
import axios from 'axios';
import Answers from './Answers.jsx';

const GH_TOKEN = require('../../../../tokens.js');

const RightBar = {
  float: 'right',
};

const Questions = ({ modal, id, questionBody, answers, showModal, helpful, getQuestions, count }) => {
  const putRequest = 'questions';
  const addHelpful = (questionId, endPoint) => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/${endPoint}/${questionId}/helpful`, {}, {
      headers: {
        Authorization: GH_TOKEN.GH_TOKEN,
      },
    })
      .then((response) => console.log('You did it dawg ', response.data))
      .then(() => getQuestions(count))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div style={RightBar}>
        <span onClick={() => addHelpful(id, putRequest)}>Helpful?</span> {helpful}|
        <button type="button" onClick={() => showModal(id, questionBody)}>Add Answer</button>
      </div>
      <h2>Q. {questionBody}</h2>
      {/* <Answers showModal={props.showModal} /> */}
      {Object.keys(answers).slice(0, 2).map((answer) => <Answers
        showModal={showModal}
        body={answers[answer].body}
        asker={answers[answer].answerer_name}
        date={answers[answer].date} helpful={answers[answer].helpfulness} id={answers[answer].id} addHelpful={addHelpful}/>).reverse()}
    </div>
  );
};

export default Questions;
