import React, { Component } from 'react'
import '../../../assets/css/Thumbnail.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import thumbnailActions from '../../features/thumbnail/actions'
import { throws } from 'assert';
import moment from 'moment'
import * as url from '../../../assets/images/trash-icon.png';
class Thumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hightlight: false,
      clicked: false,
      comment: ''
    }

    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseOver(evt) {
    this.setState({ hightlight: true })
  }

  onMouseLeave() {
    this.setState({ hightlight: false })
  }

  handleChange = event => {
    this.setState({ comment: event.target.value })
  }

  handleClick = () => {
    this.setState({ clicked: true })
    this.setState({ hightlight: false })
  }
  deleteClick = () => {
    this.props.deleteThumbnail(this.props.uuid)
  }
  componentWillMount() {
    this.props.fetchThumbnail(thumbnailActions.fetchThumbnailRequested(this.props.uuid))
  }

  render() {
    return (
      <div>

        <p>
          <time datetime={this.props.dateTime} className='dateText'>{moment(this.props.dateTime, "YYYY-MM-DD-kk-mm-ss").fromNow()}</time>
        </p>

        <div className='Thumbnail container'>
          {this.state.clicked ? (<div class="overlay">
            <img
              src={url}
              alt="asda"
            />
          </div>) : null}


          <img
            className='Image'
            src={(this.props.data != undefined) ? `data:image/jpeg;charset=UTF-8;base64,${this.props.data}` : ''}
            alt={this.props.comment}
          />


        </div>
        {!this.state.clicked ? (
          <div
            onMouseEnter={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            onClick={this.handleClick}
            className={`Name ${this.state.hightlight ? 'Highlight' : ''}`}
          >
            <p
              className={`${
                this.state.hightlight ? 'ThumbnailTextHover' : 'ThumbnailText'
                }`}
            >{this.props.comment}</p>
            <i class="icon-trash"></i>
          </div>
        ) : (
            <div>
              <input
                type='text'
                defaultValue={this.props.comment}
                onChange={this.handleChange}
                className='InputName'
              />
              <br />
              <button onClick={() => this.setState({ clicked: false })}>Y</button>
              <button onClick={() => this.setState({ clicked: false })}>X</button>
            </div>
          )}
      </div>
    )
  }
}
Thumbnail.PropTypes = {
  uuid: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { thumbnails } = state.openmrs.thumbnail
  const thumbnail = thumbnails.find(Element => {
    return Element.uuid == ownProps.uuid
  })
  if (thumbnail !== undefined) {
    var type = 'unknown';
    type = (thumbnail.MIMEType.startsWith('image')) ? 'image' : 'unknown'
    type = (thumbnail.MIMEType.endsWith('pdf')) ? 'pdf' : 'unknown'
    const { comment, data, dateTime } = thumbnail;
    return { comment, data, dateTime }

  }
  return {}
}

const mapDispatchToProps = dispatch => ({
  fetchThumbnail: uuid => {
    dispatch(thumbnailActions.fetchThumbnailRequested(uuid));
  },
  updateThumbnail: comment => {
    dispatch(thumbnailActions.updateThumbnailRequested(comment));
  },
  deleteThumbnail: uuid => {
    dispatch(thumbnailActions.deleteThumbnailRequested(uuid));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
