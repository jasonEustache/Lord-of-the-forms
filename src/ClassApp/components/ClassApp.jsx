import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../../ProfileInformation";

export class ClassApp extends Component {
  state = {
    final: {},
    done: false,
  };

  setUser = (value) => {
    return this.setState(value);
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={this.state.done ? this.state.final : ""}
        />
        <ClassForm setUser={this.setUser} />
      </>
    );
  }
}
