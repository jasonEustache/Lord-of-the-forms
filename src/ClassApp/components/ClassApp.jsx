import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../../ProfileInformation";

export class ClassApp extends Component {
  state = {
    final: {},
  };
  setFinal = (value) => {
    return this.setState(value);
  };
  render() {
    const finalUser = this.state.final;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={finalUser?.city ? finalUser : null} />
        <ClassForm setFinal={this.setFinal} />
      </>
    );
  }
}
