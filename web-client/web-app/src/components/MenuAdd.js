import React from 'react'
import { Button, Form,Breadcrumb,Image,Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader'



import { addAction } from '../actions/addAction'

const kat = [{ text: 'Makanan',value:1,},
                   { text: 'Minuman', value:2}]

require('dotenv').config()
 const config = {
   apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "restman-e8740.firebaseapp.com",
    databaseURL: "https://restman-e8740.firebaseio.com",
    projectId: "restman-e8740",
    storageBucket: "restman-e8740.appspot.com",
    messagingSenderId: "353018757291"
 };
 firebase.initializeApp(config);

 class MenuAdd extends React.Component {
   state = {
     avatar: '',
     isUploading: false,
     progress: 0,
     avatarURL: '',
     name:'',
     category:'',
     price:'',
     description:''
   };


   handleSubmit(e){
     const { name,category,price,description,avatarURL } = this.state
     const add_to = 'menu'
     e.preventDefault()

     const data = {
        name: name,
        description: description,
        price: price,
        urlImg: avatarURL,
        id_category: category,
    }

     this.props.addMenu(data,add_to)
     this.props.history.push('/menu');
     console.log('data----',this.state);
   }

   handleChange(e,type){
     if(type==='name')
       this.setState({name:e.target.value})
     else if(type==='price')
       this.setState({price:+e.target.value})
     else if(type==='description')
       this.setState({description:e.target.value})

   }

   handleChangeDropDown= (e,data) => this.setState({category:data.value})

   handleChangeUsername = (event) => this.setState({username: event.target.value});
   handleUploadStart = () => this.setState({isUploading: true, progress: 0});
   handleProgress = (progress) => this.setState({progress});
   handleUploadError = (error) => {
     this.setState({isUploading: false});
     console.error(error);
   }

   handleUploadSuccess = (filename) => {
     this.setState({avatar: filename, progress: 100, isUploading: false});
     firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
     console.log('avatar---',this.state.avatar);
   };

   render() {
     return (
       <div>
       <Form onSubmit={(e)=>this.handleSubmit(e)}>
         <Form.Field >
           <label>Name</label>
           <input required onChange={(e) => { this.handleChange(e,'name') }} value={this.state.name} type='text' placeholder='Name' />
         </Form.Field>
         <Form.Field >
           <label>Name</label>
           <input required onChange={(e) => { this.handleChange(e,'description') }} value={this.state.description} type='text' placeholder='Description' />
         </Form.Field>
         <Form.Field>
           <label>Category</label>
           <Dropdown onChange={(e,data) => { this.handleChangeDropDown(e,data) }} value={this.state.category} placeholder='Category' fluid selection options={kat} />
         </Form.Field>
         <Form.Field >
           <label>Harga</label>
           <input required onChange={(e) => { this.handleChange(e,'price') }} value={+this.state.price} type='number' step='10000' placeholder='harga' />
         </Form.Field>
         <Form.Field>
         <FileUploader
           accept="image/*"
           name="avatar"
           randomizeFilename
           storageRef={firebase.storage().ref('images')}
           onUploadStart={this.handleUploadStart}
           onUploadError={this.handleUploadError}
           onUploadSuccess={this.handleUploadSuccess}
           onProgress={this.handleProgress}
         />
         <label>image:</label>
         {this.state.isUploading &&
           <p>Progress: {this.state.progress}</p>
         }
         {this.state.avatarURL &&
           <img src={this.state.avatarURL} />
         }
         </Form.Field>
             <Button type='submit'>Add</Button>
       </Form>
       </div>
     );
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return{
     addMenu: (data,add_to) => dispatch(addAction(data,add_to))
   }
 }


 export default connect (null,mapDispatchToProps)(MenuAdd)
