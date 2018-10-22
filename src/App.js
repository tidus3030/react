import React, { Component } from "react";
import Calendar from "react-calendar";
import Moment from "react-moment";
import SimpleStorage from "react-simple-storage";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      participantInput: "",
      dateInput: new Date(),
      participants: []
    };
  }

  getParticipant = event => {
    this.setState({ participantInput: event.target.value });
  };

  getDate = date => {
    this.setState({ dateInput: date });
  };

  insertParticipant = () => {
    if (this.state.dateInput !== "" && this.state.participantInput !== "") {
      var array = this.state.participants;
      let obj = array.find(obj => obj.name === this.state.participantInput);
      if (obj) {
        alert("Participant already insert");
      } else {
        var newArray = this.state.participants.slice();
        newArray.push({
          name: this.state.participantInput,
          date: new Date(this.state.dateInput)
        });
        newArray.sort((a, b) => b.date - a.date);
        this.setState({ participants: newArray });
      }
    }
  };

  deleteParticipant = index => {
    var array = this.state.participants;
    array.splice(index, 1);
    this.setState({ participants: array });
  };

  updateParent = () => {
    this.state.participants.map(a => (a.date = new Date(a.date)));
    var newArray = this.state.participants.slice();
    newArray.sort((a, b) => b.date - a.date);
    this.setState({ participants: newArray });
  };

  render() {
    return (
      <div className="App">
        <SimpleStorage
          parent={this}
          prefix={"AppComponent"}
          blacklist={["participantInput", "dateInput"]}
          onParentStateHydrated={this.updateParent}
        />
        Add participant :
        <input
          type="text"
          value={this.state.participantInput}
          onChange={this.getParticipant}
        />
        <br />
        Choose date :
        <Calendar value={this.state.dateInput} onChange={this.getDate} />
        <br />
        <button onClick={this.insertParticipant}>Insert Participant</button>
        <Table
          participants={this.state.participants}
          deleteParticipant={this.deleteParticipant}
        />
      </div>
    );
  }
}

const Table = ({ participants, deleteParticipant }) => {
  if (participants.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((a, index) => {
            return (
              <TableRow
                key={index}
                index={index}
                name={a.name}
                date={a.date}
                deleteParticipant={deleteParticipant}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

const TableRow = ({ index, name, date, deleteParticipant }) => {
  return (
    <tr className={index % 2 === 1 ? "Odd" : "Even"}>
      <td>{name}</td>
      <td>
        <Moment format="DD/MM/YYYY">{date}</Moment>
      </td>
      <td>
        <button onClick={() => deleteParticipant(index)}>
          Delete Participant
        </button>
      </td>
    </tr>
  );
};

export default App;
