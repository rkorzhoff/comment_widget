import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import { format } from "date-fns";
class ComWidget extends React.Component {
  state = {
    comments: [],
    form: {
      name: "",
      comment: "",
    },
  };

  componentDidMount() {
    if (localStorage.getItem("state")) {
      this.setState({ ...JSON.parse(localStorage.getItem("state")) });
    }
  }

  addComment = () => {
    this.setState(
      {
        comments: [
          ...this.state.comments,
          {
            id: this.state.comments.length
              ? this.state.comments.reduce((p, c) => (p.id > c.id ? p : c)).id +
                1
              : 1, // max id +1
            name: this.state.form.name,
            comment: this.state.form.comment,
            date: new Date(),
          },
        ],
        form: {
          name: "",
          comment: "",
        },
      },
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  removeComment = (id) => {
    this.setState(
      {
        comments: this.state.comments.filter((comment) => comment.id !== id),
      },
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <div className="widget__wrapper">
        <div className="input__wrapper">
          <label className="input__label">Ваше имя:</label>
          <input
            type="text"
            className="input__text"
            value={this.state.form.name}
            name="name"
            onChange={this.handleChange}
          />
          <label className="input__label">Комментарий:</label>
          <textarea
            name="comment"
            className="input__text message"
            value={this.state.form.comment}
            onChange={this.handleChange}
          ></textarea>
          <button className="input__addButton" onClick={this.addComment}>
            Добавить комментарий
          </button>
        </div>
        {this.state.comments.map((comment) => (
          <div className="comment__wrapper" key={comment.id}>
            <span className="comment__name">
              Пользователь <b>{comment.name}</b> написал:
            </span>
            <span className="comment__text">{comment.comment}</span>
            <span className="comment__date">
              {format(
                new Date(comment.date),
                "Опубликовано dd/MM/yyyy 'в' HH:mm"
              )}
            </span>
            <button
              className="comment__remove"
              onClick={this.removeComment.bind(null, comment.id)}
            >
              х
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<ComWidget />, document.querySelector("#root"));
