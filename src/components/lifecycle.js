import React, { Component } from "react";

class Lifecycle extends Component {

    //runs first in component mounting
    constructor(props) {
        super(props) //to get parent constructor props
        console.log("PROPS", props); //display props

        this.state = {
            name: "suruchi",
            age: "24",
            UserValue: "",
            releaseBugs: false,
            error: ""
        }
        console.log("INITIAL STATE", this.state);//display initiated state
    }

    //runs after constructor in mounting 
    //also runs first in updating
    static getDerivedStateFromProps(props, state) {
        console.log("AFTER componentDidMount", state)
        // return updated state on the bases of new props coming
        if (state.name === "suruchi") {
            return {
                name: "sonali",
                age: "21"
            };
        } else {
            console.log("UPDATING getDerivedStateFromProps")
            return {
                name: "ankit",
                age: "27"
            };
        }
    }

    // after the component is rendered for the first time ,called in mounting
    componentDidMount() {
        //setting state
        console.log("AFTER getDerivedStateFromProps", this.state);
        this.setState(
            {
                name: "vaibhav",
                age: "24"
            });
    }

    //runs after getDerivedStateFromProps in updating
    shouldComponentUpdate(nextProps, nextState) {
        console.log("UPDATE getting shouldComponentUpdate");
        //basically gives permission to update or not
        return true;
    }

    //called after render so when you need to grab some information from the DOM (and potentially change it) just after an update is made.
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("UPDATE getSnapshotBeforeUpdate prev-state:", prevState)
        if (prevState.name === "sonali") {
            const value = "updating";
            // with updating state the component Updation will run twice. you can uncomment below line to see
            // this.setState({UserValue:value});
            return value;
        } else {
            return null;
        }
    }

    //it called just after getSnapshotBeforeUpdate and we paas value returned from snapshot as third argument
    componentDidUpdate(prevProps, prevState, value) {
        //can be use to control visual like scroll of the page 
        console.log("UPDATE componentDidUpdate", this.state)
        if (value === "updating") {
            // this.setState({releaseBugs:true}); //uncommnet to throw error
            console.log("UPDATE componentDidUpdate", 'state has changed.')
        } else {
            console.log("UPDATE componentDidUpdate", 'state not changed.')
        }
    }

    //called in Unmounting 
    componentWillUnmount() {
        //it is basically remove leftover values that you might have assigned for this component
        console.log("UNMOUNT componentWillUnmount");
    }

    //Catching and logging errors.
    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({ error: error });
    }

    //it runs after  getDerivedStateFromProps in creating 
    //it also runs after shouldComponentUpdate in updating
    render() {
        //uncomment to see componentDidCatch
        // if (this.state.releaseBugs) {
        //     throw new Error("I crashed!");
        // }
        return (
            <div>
                <br />
                <h1>
                    {/* render is called after getDerivedStateFromProps in mounting*/}
                Name : {this.state.name}.<br />
                Age: {this.state.age}.
                {this.state.UserValue ? <p>Thankyou</p> : ""}
                </h1>
            </div>
        );
    }

}


export default Lifecycle;