import { ShellHTML, createComponent } from 'shell-html';
import styleSheet from './style.scss';

class Home extends ShellHTML {
  render() {
    return {
      css: styleSheet,
      html: `
      <div class="home">
        <subnav-home></subnav-home>
        </nav>
        <div class="content">
          <home-main></home-main>
        </div>
      </div>`,
    };
  }
}

createComponent('page-home', Home);
