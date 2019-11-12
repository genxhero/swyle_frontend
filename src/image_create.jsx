import React, {Component} from 'react';
import postImage from './mutations/post_image';
import currentUser from './queries/current_user';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import moment from 'moment';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

/**
 * Form for creating an image_post
 */

class ImageCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            image: null, 
            fileTooBig: false, 
            invalidType: false, 
            imageURL: null, 
            title: "", 
            description: ""}
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.save = this.save.bind(this)
        this.formatFilename = this.formatFilename.bind(this)
        this.uploadToS3 = this.uploadToS3.bind(this)
    }

    handleFileChange(e) {
        const file = e.target.files[0];
      
        if (file.size > 1000000) {
            this.setState({ fileTooBig: true, image: null, photoURL: null })
            return false;
        }
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ image: file, photoURL: fileReader.result, fileTooBig: false, invalidType: false });
        }
        fileReader.readAsDataURL(file);
        
   }

    handleFormChange(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
        });
    }

    formatFilename(filename) {
        const date = moment().format("MMDDYYYY");
        const rando = Math.random()
            .toString(36)
            .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFileName = `images/${date}-${rando}-${cleanFileName}`
        return newFileName.substring(0, 60);
    }

    async uploadToS3(file, signedRequest) {
        const options = {
            headers: {
                "Content-Type": file.type,
                "Access-Control-Allow-Origin": "*",
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
        await axios.put(signedRequest, file, options)
            .then(res => {
               
            }).catch(console.log("Aws failed to save, please check your bucket"));
    }

   async save(e) {
       e.preventDefault();
       const image = this.state.image;
       const response = await this.props.s3Sign({
           variables: {
               filename: this.formatFilename(image.name),
               filetype: image.type
           }
       });
       const { signedRequest, url } = response.data.signS3;
       await this.uploadToS3(image, signedRequest)
       this.props.mutate({
           variables: {
               title: this.state.title,
               description: this.state.description,
               image: url
           }
       }).then(res =>{
           this.props.history.push(`/images/${res.data.createImagePost.id}`)
       })
   }

   render() {
       if (this.props.data.loading) {
           return<p>Loading</p>
       }
       if (!this.props.data.currentUser) {
           return <Redirect to="/login" />
       }
       return (
        <div className="image-creation-page">
               <div className="image-input-container">
                   {this.state.image ? <div className="image-creation-preview"><img src={this.state.photoURL} alt="Preview"/></div> : <div className="image-creation-placeholder"><p>Your image will appear here in preview</p></div>}
               </div>
            <form onSubmit={this.save} className="image-creation-form">
                   <h1>Post a New Image</h1>
               <label className="image-input">
                   <input className="image-input"
                       type="file"
                       onChange={this.handleFileChange}
                       accept="image/png, image/jpeg, image/gif, image/bmp, image/jpg"
                   />
                   </label>
             
                <input className="image-creation-title" type="text" onChange={this.handleFormChange("title")} placeholder="Image Title" value={this.state.title}/>
                <input className="image-creation-desc" type="text" onChange={this.handleFormChange("description")} placeholder="Description (optional)" value={this.state.description}/>
                <input type="submit" className="submit" value="Post Image" disabled={!this.state.image}/>
               </form>
        </div>
      )
   }
}

const s3Sign = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
        url
        signedRequest
    }
  }
`;

export default compose(
    graphql(s3Sign, { name: "s3Sign" }),
    graphql(currentUser)
)(
    graphql(postImage)(ImageCreate)
)