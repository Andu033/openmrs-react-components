import React, { Component } from 'react'
import '../../../assets/css/Thumbnail.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import thumbnailActions from '../../features/thumbnail/actions'
import { throws } from 'assert';

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
  componentDidMount() {
    this.props.fetchThumbnail(thumbnailActions.fetchThumbnailRequested(this.props.uuid))
  }
  render() {
    return (
      <div>
        <p>
          <time datetime={this.props.datetime}>this.props.datetime</time>
        </p>
        <div className='Thumbnail'>
          <img
            className='Image'
            src='https://i.ytimg.com/vi/szmS_M-BMls/maxresdefault.jpg'
            alt='Paris'
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
  if (thumbnail === undefined) return {};
  else {
    const { comment, links, datetime } = thumbnail;
    return { comment, links, datetime }

  }
}

const mapDispatchToProps = dispatch => ({
  fetchThumbnail: uuid => {
    dispatch(thumbnailActions.fetchThumbnailRequested(uuid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
