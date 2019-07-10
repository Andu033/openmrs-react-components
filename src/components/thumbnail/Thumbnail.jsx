import React, { Component } from 'react'
import '../../../assets/css/Thumbnail.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import thumbnailActions from '../../features/thumbnail/actions'
import { throws } from 'assert';
import moment from 'moment'

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

  componentWillMount() {
    this.props.fetchThumbnail(thumbnailActions.fetchThumbnailRequested(this.props.uuid))
    console.log(this.props.uuid)
  }

  render() {
    return (
      <div>
        <p>
          <time datetime={this.props.dateTime}>{this.props.dateTime}</time>
        </p>
        <div className='Thumbnail'>
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
    const { comment, data, dateTime } = thumbnail;
    return { comment, data, dateTime }

  }
}

const mapDispatchToProps = dispatch => ({
  fetchThumbnail: uuid => {
    dispatch(thumbnailActions.fetchThumbnailRequested(uuid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
