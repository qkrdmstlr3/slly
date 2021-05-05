import { ShellHTML, createComponent } from '@Lib/shell-html';
import styleSheet from './style.scss';
import { useGlobalState, setGlobalState } from '../../lib/shell-html/state';
import { CheckPostType } from '../../types/types';
import { CheckPostStatusType } from '../../types/enum';
import { getDday } from '../../utils/calcDate';
import { ipcRenderer } from 'electron';

class CheckPost extends ShellHTML {
  constructor() {
    super(undefined);
  }

  connectedCallback() {
    this.enrollObserving('checkpostControl');
  }

  disconnectedCallback() {
    this.releaseObserving('checkpostControl');
    ipcRenderer?.removeAllListeners('checkpost:getPost');
  }

  getPostStatus(status: CheckPostStatusType): string {
    switch (status) {
      case CheckPostStatusType.todo:
        return `<div class="post__status status__todo">x</div>`;
      case CheckPostStatusType.doing:
        return `<div class="post__status status__doing">⎯</div>`;
      case CheckPostStatusType.done:
        return `<div class="post__status done">v</div>`;
      default:
        return '';
    }
  }

  getPost(): void {
    const postId = useGlobalState('checkpostControl').currentCheckPostId;
    if (!postId || postId === this.state?.id) return;

    const posts = useGlobalState('checkposts');
    const [post] = posts.filter((post: CheckPostType) => post.id === postId);
    if (post) {
      this.setState(post);
      return;
    }

    ipcRenderer?.send('checkpost:getPost', { id: postId });
    ipcRenderer?.once('checkpost:getPost', (event, post) => {
      setGlobalState('checkposts', [...posts, post]);
      this.setState(post);
    });
  }

  render() {
    this.getPost();
    const post = this.state;

    return {
      css: styleSheet,
      html: post
        ? `
      <div class="post">
        <header class="post__header">
          <div class="post__header__left">
            <div class="post__header__top">
              ${this.getPostStatus(post.status)}
              <h1 class="post__header__title" contenteditable="true">제목</h1>
              <span class="post__header__dday">${getDday(post.endDate)}</span>
            </div>
            <div class="post__header__bottom">
              <input type="date" value="${post.startDate}" />
              <input type="date" value="${post.endDate}" />
            </div>
          </div>
          <div class="post__header__right">
            <button>삭제</button>
          </div>
        </header>
        <div class="post__content">
          ${post.content}
        </div>
      </div>`
        : '<div>none</div>',
    };
  }
}

createComponent('post-check', CheckPost);
