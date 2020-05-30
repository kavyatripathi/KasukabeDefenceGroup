import React,{Component} from 'react';
import classes from './FormDetails.css';
import Input from '../../container/UI/Input/Input';
import axios from '../../Axios';
import Spinner from '../../container/UI/Spinner/Spinner';
import FormSummary from '../../components/FormSummary/FormSummary';
import Auxiliary from '../../hoc/Auxiliary';
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
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street of defence actions'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6,
                    maxlength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter your Country of residence'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter ur contact number'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
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
                value: 'Mitsy',
                validation: {
                    required: true
                },
                valid: true,
            }
            
        },
        loading: false,
        validForm: false
                
    }
    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.formDet
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({formDet: updatedForm, validForm: formIsValid}) ;

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
                    <Auxiliary>
                    <Input
                        key={formData.id}
                        elementType={formData.config.elementType}
                        elementConfig={formData.config.elementConfig}
                        value={formData.config.value}
                        invalid={!formData.config.valid}
                        shouldValidate={formData.config.validation}
                        touched={formData.config.touched}
                        changed= {(event) => this.inputChangeHandler(event,formData.id)}
                    />
                    </Auxiliary>
                ))}
            </form>
        )

        let detail = []
        for (let i in this.state.formDet){
            detail.push({
                key:i,
                dets:this.state.formDet[i].value
            })
        }
        const formSummary = <FormSummary details={detail.dets} key={detail.key} />

        
        return(
            <div className={classes.FormDetails}>
            <h1 style={{fontFamily: 'Tahoma', color: 'black'}}>WELCOME TO KASUKABE DEFENCE GROUP</h1>
                {form}
                <button onClick={this.submitButtonHandler}
                    style ={{borderRadius: '3px', padding: '10px', color: 'white', backgroundColor: 'green', boxShadow: '6px'}}
                >SUBMIT</button>
                
            </div>      
        )
    }
}

export default FormDetails;
