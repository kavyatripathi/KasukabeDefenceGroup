import React,{Component} from 'react';
import classes from './FormDetails.css';
import Input from '../../container/UI/Input/Input';
import axios from '../../Axios';
import Spinner from '../../container/UI/Spinner/Spinner';
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
                    type: 'text',
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
            
        },
        loading: false
                
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

    submitButtonHandler = () => {
        this.setState({loading: true});
        const details = {
            name: this.state.formDet.name,
            street: this.state.formDet.street,
            zipcode: this.state.formDet.zipCode,
            country: this.state.formDet.Country,
            phone: this.state.formDet.phone,
            team: this.state.formDet.team
        }
        if (this.state.loading)
        {
            return <Spinner/>
        }
        axios.post('/details.json',details)
        .then(res => {
            this.setState({loading: false});
            console.log(res);
        })
        .catch(err => console.log(err));
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
            <header className={classes.FormDetails}>
            <h1 style={{fontFamily: 'Tahoma', color: 'black'}}>WELCOME TO KASUKABE DEFENCE GROUP</h1>
                {form}
            <button style={{textAlign: 'center', color: 'white', background: 'red' }} onClick = {this.submitButtonHandler}>SUBMIT</button>
            </header>

            
        )
    }
}

export default FormDetails;
