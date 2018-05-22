// Import React
import React from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';

// Require CSS
require('normalize.css');
require('./inter/inter.css');

const Deck = styled.article`
  font-size: 1.5em;
  margin: 1em;
  font-family: 'Inter UI', sans-serif;
`;
const Section = styled.section`
  margin-top: 1em;
`;
const Title = styled.h1``;
const SectionHeading = styled.h2``;
const Heading = styled.h3``;
const Paragraph = styled.p``;
const Instruction = styled.p`
  color: hsl(209, 100%, 44%);
`;
const Code = styled.code`
  background: lightgray;
  color: black;
`;
const Link = styled.a`
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

const format = str => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
class CodePane extends React.Component {
  createMarkup() {
    const {source, children} = this.props;
    const code = source == null || source === '' ? children : source;
    return {
      __html: format(code)
    };
  }
  _onRef = element => {
    Prism.highlightElement(element);
  };
  render() {
    return (
      <pre>
        <code
          ref={this._onRef}
          className={`language-${this.props.lang}`}
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </pre>
    );
  }
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Section>
          <Title>Intro To React</Title>
          <Instruction>
            Open these notes in your browser:{' '}
            <Link href="https://itr.forbesl.co.uk">https://itr.forbesl.co.uk</Link>
          </Instruction>
          <Paragraph>
            You can find an example of the code at each step in{' '}
            <Link href="https://github.com/ForbesLindesay/intro-to-react/tree/master/src/steps">
              https://github.com/ForbesLindesay/intro-to-react/tree/master/src/steps
            </Link>
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>Basic Setup</SectionHeading>

          <Heading>Node.js</Heading>
          <Instruction>
            Run <Code>node --version</Code>.
          </Instruction>
          <Instruction>The output should be either:</Instruction>
          <Paragraph>
            <Code>v6.14.2</Code>, <Code>v8.11.2</Code> or <Code>v10.1.0</Code>
          </Paragraph>
          <Instruction>If you don't have node, and are using Windows:</Instruction>
          <Paragraph>
            <Link href="https://nodejs.org/en/download/">
              https://nodejs.org/en/download/
            </Link>
          </Paragraph>
          <Instruction>If you don't have node, and are using OSX or Linux:</Instruction>
          <Paragraph>
            If you don't have it already, I suggest installing nvm:{' '}
            <Link href="https://nodejs.org/en/download/">
              https://github.com/creationix/nvm
            </Link>
          </Paragraph>
          <Paragraph>Once you have nvm installed, you can simply run:</Paragraph>
          <Paragraph>
            <Code>nvm install 8</Code>
          </Paragraph>

          <Heading>npm</Heading>
          <Instruction>
            Run <Code>npm --version</Code>.
          </Instruction>
          <Instruction>The output should be:</Instruction>
          <Paragraph>
            <Code>v5.4.2</Code>
          </Paragraph>
          <Instruction>If you don't have the latest version of npm, run:</Instruction>
          <Paragraph>
            <Code>npm i npm -g</Code>
          </Paragraph>
          <Paragraph>
            The latest version of yarn should work fine as an alternative.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>Project Setup</SectionHeading>
          <Paragraph>
            To reduce the amount you need to install, you can download{' '}
            <Link href="/base.tgz">this tarball</Link> that contains all of the
            dependencies. If you skip doing this, they will just be downloaded when you
            run npm install.
          </Paragraph>
          <Heading>package.json</Heading>
          <Paragraph>
            We will want to be able to use third party libraries in our project. We can
            use a <Code>package.json</Code> file to store metadata about these
            dependencies.
          </Paragraph>
          <Instruction>
            Create a file called <Code>package.json</Code> with this content:
          </Instruction>
          <CodePane lang="javascript" source={require('./steps/01-init/package.json')} />

          <Heading>index.html</Heading>
          <Paragraph>The entry point to a web app is always an html file.</Paragraph>
          <Instruction>
            Create a file called <Code>index.html</Code> with this content:
          </Instruction>
          <CodePane lang="html" source={require('./steps/01-init/index.html')} />

          <Heading>src/index.js</Heading>
          <Paragraph>
            We're going to put all our business logic in an <Code>src</Code> folder, in
            JavaScript files.
          </Paragraph>
          <Instruction>
            Create a file called <Code>src/index.js</Code> with this content:
          </Instruction>
          <CodePane lang="javascript" source={require('./steps/01-init/src/index.js')} />

          <Heading>webpack.config.js</Heading>
          <Paragraph>Now we need to tell webpack how to build our code</Paragraph>
          <Instruction>
            Create a file called <Code>webpack.config.js</Code> with this content:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/01-init/webpack.config.js')}
          />

          <Heading>Development</Heading>
          <Instruction>
            Run <Code>npm run start</Code> and load the url, usually{' '}
            <Link href="http://localhost:8080/">http://localhost:8080/</Link>
          </Instruction>
          <Instruction>
            You should see the current time, updated every 100ms, and a text box.
          </Instruction>
          <Instruction>
            Notice how the text box doesn't really work because your input is cleared
            every 100ms.
          </Instruction>
        </Section>
        <Section>
          <SectionHeading>Production</SectionHeading>

          <Heading>Babel</Heading>
          <Paragraph>
            Babel lets you use newer syntax that may not currently be understood by all
            browsers. By defalut, babel just parses your code, then writes it out again,
            without changing any of the semantics.
          </Paragraph>
          <Instruction>
            To tell babel what to compile, add a <Code>.babelrc</Code> file:
          </Instruction>
          <CodePane lang="javascript" source={require('./steps/03-jsx/.babelrc')} />

          <Instruction>
            Run <Code>npm run build</Code> and open the <Code>build/</Code> folder
          </Instruction>
          <Instruction>
            In <Code>build/static/js/</Code> you should see a very large, uncompressed
            JavaScript file. We can tell webpack to compress that file, using{' '}
            <Code>mode</Code>.
          </Instruction>

          <Instruction>
            Add a <Code>module</Code> section and update the <Code>mode</Code> setting of{' '}
            <Code>webpack.config.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/02-production/webpack.config.js')}
          />

          <Heading>NODE_ENV</Heading>
          <Paragraph>
            <Code>process.env.NODE_ENV</Code> lets us adjust behaviour between development
            and production. It is automatically replaced with <Code>'development'</Code>{' '}
            or <Code>'production'</Code> by webpack, <strong>before</strong> uglify does
            dead code elimination.
          </Paragraph>
          <Instruction>
            Update <Code>src/index.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/02-production/src/index.js')}
          />

          <Heading>Testing production</Heading>
          <Instruction>
            Run <Code>npm run build</Code> then run <Code>npm run serve-prod</Code>.
            Notice when you load the resulting URL, that it says the mode is production.
          </Instruction>
          <Instruction>
            Run <Code>npm run start</Code>. Notice when you load the resulting URL, that
            it says the mode is development.
          </Instruction>
        </Section>
        <Section>
          <SectionHeading>JSX</SectionHeading>

          <Paragraph>JSX is a shorthand for writing React code.</Paragraph>

          <CodePane
            lang="javascript"
            source={'const x = <div className="my-class">my content</div>'}
          />
          <Paragraph>is short for</Paragraph>

          <CodePane
            lang="javascript"
            source={
              "const x = React.createElement('div', {className: 'my-class'}, 'my content');"
            }
          />

          <Paragraph>
            Now we have babel configured, we can finally start using some react code
          </Paragraph>
          <Instruction>
            Update <Code>src/index.js</Code> to use JSX:
          </Instruction>
          <CodePane lang="javascript" source={require('./steps/03-jsx/src/index.js')} />

          <Paragraph>
            When you load the result in a browser, you should notice you are now able to
            use the text input. This is because when React renders, it only updates things
            that have changed. It updates the current date and time, but leaves the input
            in tact.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>Functional Components</SectionHeading>

          <Paragraph>
            React lets us wrap up pieces of jsx as re-usable "components".
          </Paragraph>
          <Instruction>
            Create a new component in a new file <Code>src/WelcomeMessage.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/04-functional-components/src/WelcomeMessage.js')}
          />

          <Instruction>
            To use your component, update <Code>src/index.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/04-functional-components/src/index.js')}
          />

          <Instruction>
            To test your knowledge, try creating a component that shows the current "mode"
            taken from <Code>NODE_ENV</Code>. This component shouldn't need to take any
            properties.
          </Instruction>
          <Paragraph>
            N.B. I always recommend creating a new file for every single component.
          </Paragraph>
          <Heading>Mode Functional Component</Heading>
          <Paragraph>You should have created something like</Paragraph>
          <CodePane
            lang="javascript"
            source={require('./steps/04-functional-components/src/Mode.js')}
          />
        </Section>
        <Section>
          <SectionHeading>Classes</SectionHeading>

          <Instruction>
            Create a new file to define a class <Code>src/Counter.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/05-classes/src/Counter.js')}
          />

          <Instruction>
            Update <Code>src/index.js</Code> to demonstrate using that class:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/05-classes/src/index.js')}
          />

          <Heading>Binding Class Methods</Heading>
          <Instruction>
            Try changing <Code>src/index.js</Code> to indirectly call those methods:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/06-arrow-functions/src/index.js')}
          />

          <Instruction>
            To fix the resulting error, update <Code>src/Counter.js</Code> to use arrow
            functions:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/06-arrow-functions/src/Counter.js')}
          />
        </Section>
        <Section>
          <SectionHeading>Component Classes</SectionHeading>
          <Instruction>
            Add a new react component, <Code>src/WelcomeForm.js</Code>, this time using
            the class style:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/06-component-classes/src/WelcomeForm.js')}
          />

          <Instruction>
            Update <Code>src/index.js</Code> to demonstrate using the new component:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/06-component-classes/src/index.js')}
          />
        </Section>
        <Section>
          <SectionHeading>State</SectionHeading>
          <Paragraph>State is what lets us make our interfaces interactive.</Paragraph>
          <Heading>Welcome Form</Heading>
          <Instruction>
            Update <Code>src/WelcomeForm.js</Code> so that when you edit the name, we show
            the appropriate welcome message:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/07-state/src/WelcomeForm.js')}
          />
          <Heading>Counter</Heading>
          <Instruction>
            To test your knowledge of state and event handlers. Try building a "Counter"
            component with an increase and decrease button and a value displaying the
            current integer. It should always start at 0.
          </Instruction>
          <Paragraph>
            N.B. that only state stored in the <Code>state</Code> property will
            automatically trigger React to re-render the component.
          </Paragraph>
          <Paragraph>
            N.B. the only safe way to update <Code>state</Code> is via{' '}
            <Code>this.setState</Code> calls.
          </Paragraph>
          <Heading>Counter Example</Heading>
          <Instruction>You should have something like:</Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/08-state-2/src/Counter.js')}
          />
          <Heading>Functional Set State</Heading>
          <Paragraph>
            <Code>setState</Code> can also accept a function, for when state depends on
            the old state.
          </Paragraph>
          <CodePane lang="javascript">
            {'this.setState(oldState => ({value: oldState.value + 1}));'}
          </CodePane>
          <Instruction>
            Try updating your <Code>src/Counter.js</Code> component to use this style.
          </Instruction>
          <Paragraph>This style has two advantages:</Paragraph>
          <ol>
            <li>
              You can extract the logic for calculating the new state based on an old
              state into its own function. Sometimes this makes code easier to follow,
              sometimes it doesn't.
            </li>
            <li>
              Future versions of React will sometimes re-order your updates, this will
              ensure that your code still functions correctly when that happens.
            </li>
          </ol>
          <Instruction>
            Try updating your render method to display odd number in red and even numbers
            in green (using the classes already defined in index.html)
          </Instruction>
          <Heading>Even Odd Counter Example</Heading>
          <Instruction>You should have something like:</Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/09-functional-state/src/Counter.js')}
          />
          <Paragraph>
            N.B. there are lots of ways you could write this, don't worry if what you
            wrote doesn't exaclty match the example.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>Data Fetching</SectionHeading>
          <Paragraph>
            Applications really get interesting when they deal with data stored on
            servers. We'll use the starwars API <Code>https://swapi.co/</Code> for our
            demos.
          </Paragraph>
          <Instruction>
            Create a file called <Code>src/StarWarsFilmList.js</Code> with this content:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/10-fetching-data-0/src/StarWarsFilmList.js')}
          />
          <Paragraph>
            The Star Wars API is returning an object as the <Code>response</Code>, that
            looks like:
          </Paragraph>
          <CodePane
            lang="javascript"
            source={require('./steps/10-fetching-data-0/src/sample-response.json')}
          />
          <Instruction>
            Create a file called <Code>src/App.js</Code> with this content:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/10-fetching-data-0/src/App.js')}
          />
          <Instruction>
            Update <Code>src/index.js</Code> to render the app component:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/10-fetching-data-0/src/index.js')}
          />
          <Paragraph>
            We saw lots of new concepts here. First, <Code>componentDidMount</Code> is a
            "lifecycle hook" that is called after the component has been added to the
            document. This is a great time to fetch any data we need.
          </Paragraph>
          <Paragraph>
            To add a list of items, we use <Code>.map</Code> on an array to convert each
            item in the array into a react element. React also requires us to add a{' '}
            <Code>key</Code> property to each element. This is so that React can track
            items if the array is ever re-ordered.
          </Paragraph>
          <Paragraph>
            We're using a promise based API to fetch the data. Note how we always need to
            handle all three states in render:
          </Paragraph>
          <ul>
            <li>Loading</li>
            <li>Success</li>
            <li>Error</li>
          </ul>

          <Heading>Select Elements</Heading>
          <Paragraph>
            We're going to add to our star wars app a bit by letting you select a film and
            then see some info about that film.
          </Paragraph>
          <Instruction>
            Rename <Code>src/StarWarsFilmList.js</Code> to{' '}
            <Code>src/StarWarsFilmSelector.js</Code> and add replace the jsx returned on
            success:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/11-fetching-data-1/src/StarWarsFilmSelector.js.render')}
          />
          <Instruction>
            Add an <Code>_onChange</Code> method.
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/11-fetching-data-1/src/StarWarsFilmSelector.js.onChange')}
          />
          <Paragraph>
            Select elements in React have <Code>value</Code> property to represent the
            value of the selected element. The value must be a plain string. We're
            building our select so that it takes <Code>value</Code> that is either{' '}
            <Code>null</Code> or a <Code>Film</Code> object of the form{' '}
            <Code>{"{name: 'some name', url: 'http://example.com'}"}</Code>. It also takes
            an <Code>onChange</Code> property that will be passed a film in that format.
          </Paragraph>
          <Instruction>
            Update <Code>src/App.js</Code> to track the selected film and render the
            film's opening_crawl:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/11-fetching-data-1/src/App.js')}
          />
          <Paragraph>
            Now we always just render <Code>{'<App />'}</Code> in{' '}
            <Code>src/index.js</Code> we don't need to keep updating it!
          </Paragraph>
          <Heading>Render Character List</Heading>
          <Paragraph>
            Lets test your understanding of this. We're going to try rendering the list of
            characters in each film. Unfortunately the Star Wars API doesn't give us the
            actual character names as part of the <Code>Film</Code> object. What it gives
            us is a list of URLs. Requesting one of those URLs returns an object as the{' '}
            <Code>response</Code>:
          </Paragraph>
          <CodePane lang="javascript">{'{\n  "name": "Luke Skywalker"\n}'}</CodePane>
          <Instruction>
            Update <Code>src/App.js</Code>:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/12-fetching-data-2/src/App.js')}
          />
          <Instruction>
            Create <Code>src/StarWarsCharacter.js</Code> and fill in the TODO items:
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/12-fetching-data-2/src/StarWarsCharacter.part.js')}
          />
          <Instruction>
            Add the missing <Code>key</Code> property in the list in{' '}
            <Code>src/App.js</Code>.
          </Instruction>
          <Paragraph>
            Once you add the <Code>key</Code> property, React becomes much smarter about
            re-using the character elements. This means that it will only have to fetch{' '}
            <strong>new</strong> characters as you change films.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>External State</SectionHeading>
          <Paragraph>
            We want to keep all UI state in the components, but it's important not to have
            the same state in more than one location. After a while, it can get
            frustrating to keep having to move state up and down the component hierachy.
          </Paragraph>
          <Instruction>
            Create a new file called <Code>src/Store.js</Code>
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/14-external-state/src/Store.js')}
          />
          <Instruction>
            Update <Code>src/StarWarsFilmSelector.js</Code> to fetch data from{' '}
            <Code>src/Store.js</Code>
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/14-external-state/src/StarWarsFilmSelector.js')}
          />
          <Instruction>
            Update <Code>src/StarWarsCharacter.js</Code> to fetch data from{' '}
            <Code>src/Store.js</Code>
          </Instruction>
        </Section>
        <Section>
          <SectionHeading>Render Properties</SectionHeading>
          <Instruction>
            Create a new file called <Code>src/Read.js</Code>
          </Instruction>
          <CodePane lang="javascript" source={require('./steps/15-read/src/Read.js')} />
          <Instruction>
            Update <Code>src/StarWarsFilmSelector.js</Code> to use Read
          </Instruction>
          <CodePane
            lang="javascript"
            source={require('./steps/15-read/src/StarWarsFilmSelector.js')}
          />
          <Instruction>
            Update <Code>src/StarWarsCharacter.js</Code> to also use read
          </Instruction>
        </Section>
      </Deck>
    );
  }
}
