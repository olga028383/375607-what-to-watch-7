import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import Review from '../../review/review';
import Loading from '../../loading/loading';
import {fetchComments} from '../../../store/api-actions';
import {getApi} from '../../../store/application/selectors';

function Reviews({api}) {
  const params = useParams();

  const [data, setData] = useState({
    comments: [],
    isLoading: false,
  });

  const {comments, isLoading} = data;
  const countComments = Math.ceil(comments.length / 2);

  useEffect(() => {
    fetchComments(params.id, api)
      .then((commentsData) => {
        setData({
          comments: commentsData,
          isLoading: true,
        });
      });
  }, [params.id]);

  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">
        {comments.slice(0, countComments).map((comment, id) =>
          <Review key={`${comment.id}-comment`} review={comment}/>)}
      </div>

      <div className="film-card__reviews-col">
        {comments.slice(countComments).map((comment) => <Review key={`${comment.id}-comment`} review={comment}/>)}
      </div>
    </div>
  );
}


Reviews.propTypes = {
  api: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  api: getApi(state),
});

export {Reviews};
export default connect(mapStateToProps, null)(Reviews);
