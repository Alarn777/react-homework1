import React, { Component } from 'react';
import { MdEdit, MdDelete, MdSave } from "react-icons/md"

class Athlete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderUI = this.renderUI.bind(this)
    }

    edit() {
        this.setState({ editing: true })
    }

    delete() {
        this.props.onDelete(this.props.index)
    }

    save(event) {
        event.preventDefault(); // to prevent the default behaviour/ functionality
        console.log(this.newIdea.value, this.props.index);
        this.props.onChange(this.newIdea.value, this.props.index);
        this.setState({ editing: false })
    }

    renderForm(props) {
        return (
            <div>
                <form>
                    <textarea ref={input => this.newIdea = input} cols="30" rows="10" />
                    <span>
            <button onClick={this.save}><MdSave /></button>
          </span>
                </form>
            </div>
        )
    }

    renderUI(props) {
        return (
            <div className="athlete">
                <div>{this.props.children}</div>
                <span>

        </span>
            </div>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderUI()
    }
}

export default Athlete;