// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Code,
  CodePane,
  Link
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
require('spectacle/lib/themes/default/index.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        progress="number"
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Intro To React
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Forbes Lindesay
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Basic Setup
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Node.js
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Run <Code>node --version</Code>.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            The output should be either:
          </Text>
          <Text>
            <Code>v6.11.3</Code> or <Code>v8.5.0</Code>
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            If you don't have node, and are using Windows:
          </Text>
          <Text>
            <Link href="https://nodejs.org/en/download/">
              https://nodejs.org/en/download/
            </Link>
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            If you don't have node, and are using OSX or Linux:
          </Text>
          <Text>
            <Link href="https://nodejs.org/en/download/">
              https://github.com/creationix/nvm
            </Link>
          </Text>
          <Text>
            <Code>nvm install 8</Code>
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            npm
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Run <Code>npm --version</Code>.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            The output should be:
          </Text>
          <Text>
            <Code>v5.4.2</Code>
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            If you don't have the latest version of npm, run:
          </Text>
          <Text>
            <Code>npm i npm -g</Code>
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Project Setup
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            package.json
          </Heading>
          <Text margin="10px 0 0">
            We will want to be able to use third party libraries in our project. We can
            use a <Code>package.json</Code> file to store metadata about these
            dependencies.
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            package.json
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a file called <Code>package.json</Code> with this content:
          </Text>
          <CodePane lang="javascript" source={require('./steps/01-init/package.json')} />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            index.html
          </Heading>
          <Text margin="10px 0 0">
            The entry point to a web app is always an html file.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a file called <Code>index.html</Code> with this content:
          </Text>
          <CodePane lang="html" source={require('./steps/01-init/index.html')} />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            src/index.js
          </Heading>
          <Text margin="10px 0 0">
            We're going to put all our business logic in an <Code>src</Code> folder, in
            JavaScript files.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a file called <Code>src/index.js</Code> with this content:
          </Text>
          <CodePane lang="javascript" source={require('./steps/01-init/src/index.js')} />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            webpack.config.js
          </Heading>
          <Text margin="10px 0 0">Now we need to tell webpack how to build our code</Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a file called <Code>webpack.config.js</Code> with this content:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/01-init/webpack.config.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Development
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Run <Code>npm run start</Code> and load the url, usually{' '}
            <Link href="http://localhost:8080/">http://localhost:8080/</Link>
          </Text>
          <Text margin="20px 0 0" textColor="tertiary">
            You should see the current time, updated every 100ms, and a text box.
          </Text>
          <Text margin="20px 0 0" textColor="tertiary">
            Notice how the text box doesn't really work because your input is cleared
            every 100ms.
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Production
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Production
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Run <Code>npm run build</Code> and open the build folder
          </Text>
          <Text margin="20px 0 0" textColor="tertiary">
            In <Code>build/static/js</Code> you should see a very large, uncompressed
            JavaScript file. We can tell webpack to compress that file.
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Production
          </Heading>
          <Text margin="10px 0 0">Plugins can help optimise code in production</Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Update the plugins section of <Code>webpack.config.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/02-production/webpack.config.plugins.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            NODE_ENV
          </Heading>
          <Text margin="10px 0 0">
            <Code>process.env.NODE_ENV</Code> and <Code>webpack.DefinePlugin</Code>
            let us adjust behaviour between development and production.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Update <Code>src/index.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/02-production/src/index.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Testing production
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Run <Code>npm run build</Code> then run <Code>npm run serve-prod</Code>.
            Notice when you load the resulting URL, that it says the mode is production.
          </Text>
          <Text margin="20px 0 0" textColor="tertiary">
            Run <Code>npm run start</Code>. Notice when you load the resulting URL, that
            it says the mode is development.
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Babel and JSX
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            JSX
          </Heading>
          <Text margin="10px 0 0">JSX is a shorthand for writing React code.</Text>

          <CodePane
            lang="javascript"
            source={'const x = <div className="my-class">my content</div>'}
          />
          <Text margin="10px 0 0">is short for</Text>

          <CodePane
            lang="javascript"
            source={
              "const x = React.createElement('div', {className: 'my-class'}, 'my content');"
            }
          />

          <Text margin="10px 0 0">
            If you add JSX to your JavaScript file, webpack will throw errors. Babel helps
            fix these.
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Babel and Webpack
          </Heading>
          <Text margin="10px 0 0">
            Loaders let you use newer syntax, not currently understood by browsers
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Add a module section to <Code>webpack.config.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/03-jsx/webpack.config.module.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            BabelRC
          </Heading>
          <Text margin="10px 0 0">
            By defalut, babel just parses your code, then writes it out again, without
            changing any of the semantics.
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            To tell babel what to compile, add a <Code>.bablerc</Code> file:
          </Text>
          <CodePane lang="javascript" source={require('./steps/03-jsx/.babelrc')} />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            JSX
          </Heading>
          <Text margin="10px 0 0">
            Now we have babel configured, we can finally start using some react code
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Update <Code>src/index.js</Code> to use JSX:
          </Text>
          <CodePane lang="javascript" source={require('./steps/03-jsx/src/index.js')} />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            JSX
          </Heading>
          <Text margin="10px 0 0">
            When you load the result in a browser, you should notice you are now able to
            use the text input. This is because when React renders, it only updates things
            that have changed. It updates the current date and time, but leaves the input
            in tact.
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Functional Components
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Functional Components
          </Heading>
          <Text margin="10px 0 0">
            React lets us wrap up pieces of jsx as re-usable "components".
          </Text>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a new component in a new file <Code>src/WelcomeMessage.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/04-functional-components/src/WelcomeMessage.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Functional Components
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            To use your component, update <Code>src/index.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/04-functional-components/src/index.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Functional Components
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            To test your knowledge, try creating a component that shows the current "mode"
            taken from <Code>NODE_ENV</Code>. This component shouldn't need to take any
            properties.
          </Text>
          <Text margin="10px 0 0" textColor="secondary">
            N.B. I always recommend creating a new file for every single component.
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            Classes
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Create a new file to define a class <Code>src/Counter.js</Code>:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/05-classes/src/Counter.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Update <Code>src/index.js</Code> to demonstrate using that class:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/05-classes/src/index.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Try chaning <Code>src/index.js</Code> to indirectly call those methods:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/06-arrow-functions/src/index.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            To fix the resulting error, update <Code>src/Counter.js</Code> to use arrow
            functions:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/06-arrow-functions/src/Counter.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Component Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Add a new react component, <Code>src/WelcomeForm.js</Code>, this time using
            the class style:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/06-component-classes/src/WelcomeForm.js')}
          />
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            Component Classes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Update <Code>src/index.js</Code> to demonstrate using the new component:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/06-component-classes/src/index.js')}
          />
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={1} textColor="primary" caps>
            State
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            State
          </Heading>
          <Text margin="10px 0 0">
            State is what lets us make our interfaces interactive.
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" caps>
            State
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary">
            Update <Code>src/WelcomeForm.js</Code> so that when you edit the name, we show
            the appropriate welcome message:
          </Text>
          <CodePane
            lang="javascript"
            source={require('./steps/07-state/src/WelcomeForm.js')}
          />
        </Slide>
      </Deck>
    );
  }
}
