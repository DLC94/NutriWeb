import React, {Component} from 'react';
import {FormGroup,FormControl,ControlLabel} from 'react-bootstrap';

class FieldGroup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <FormGroup>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.onChange}
                />
            </FormGroup>
        )
    }
}

export default FieldGroup;