// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from "react";
import "./App.css";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
    };
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context,
      });
    });
    // Next steps: Error handling using the error object

    microsoftTeams.registerOnThemeChangeHandler((theme) => {
      if (theme !== this.state.theme) {
        this.setState({ theme });
      }
    });
  }

  render() {
    let userName =
      Object.keys(this.state.context).length > 0
        ? this.state.context["upn"]
        : "";

    const isTheme = this.state.theme;
    let newTheme;
    if (isTheme === "default") {
      newTheme = {
        backgroundColor: "#EEF1F5",
        color: "#16233A",
      };
    } else {
      newTheme = {
        backgroundColor: "#2B2B30",
        color: "#FFFFFF",
      };
    }

    return (
      <div style={newTheme}>
        <h3>Hello World!</h3>
        <h1>Congratulations {userName}!</h1>{" "}
        <h3>This is the tab you made :-)</h3>
        <div>
          <h1>Important Contacts</h1>
          <ul>
            <li>
              Help Desk:{" "}
              <a href="mailto:support@company.com">support@company.com</a>
            </li>
            <li>
              Human Resources:{" "}
              <a href="mailto:hr@company.com">hr@company.com</a>
            </li>
            <li>
              Facilities:{" "}
              <a href="mailto:facilities@company.com">facilities@company.com</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Tab;
