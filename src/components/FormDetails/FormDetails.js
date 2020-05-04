import React,{Component} from 'react';
import classes from './FormDetails.css';
import Input from '../../container/UI/Input/Input';
import Backdrop from '../../container/UI/Backdrop/Backdrop';
class FormDetails extends Component {
    state = {
        formDet : {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: Text,
                    placeholder: 'Your street of defence actions'
                },
                value:'',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter your Zip Code'
                },
                value: ''
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter your Country of residence'
                },
                value: ''
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter ur contact number'
                },
                value: ''
            },
            team: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Select your favourite leader',
                    options: [
                        {value: 'mitsy', displayValue: 'Mitsy'},
                        {value: 'shinchan', displayValue: 'Shinchan'},
                        {value: 'kazama', displayValue: 'Kazama'},
                        {value: 'bochan', displayValue: 'BoChan'}
                    ],
                    
                },
                value: 'Mitsy'
            }
            
        }
                
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.formDet
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedForm[inputIdentifier]=updatedFormElement;
        this.setState({formDet: updatedForm}) ;

    }
    render(){
        const formElementsArray = [];
        for (let key in this.state.formDet){
            formElementsArray.push({
                id: key,
                config: this.state.formDet[key]
            })
        }   
        let form = (
            <form>
                {formElementsArray.map(formData => (
                    <Input
                        key={formData.id}
                        elementType={formData.config.elementType}
                        elementConfig={formData.config.elementConfig}
                        value={formData.config.value}
                        changed= {(event) => this.inputChangeHandler(event,formData.id)}
                    />
                ))}
            </form>
        )
        return(
            <div>
            <header className={classes.FormDetails}>
            <Backdrop/>
            <h1 style={{fontFamily: 'gigi', color: 'pink'}}>Welcome to Kasukabe Defence Group !!</h1>
                {form}
            </header>
            </div>
            
        )
    }
}

export default FormDetails;