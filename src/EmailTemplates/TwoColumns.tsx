import { Html, Head, Preview, Body, Container, Section, Text, Img, Link } from '@react-email/components';

const EmailComponent = ({  }) => {
  return (
    <Html>
      <Head />
      <Preview>Your email preview text here</Preview>
      <Body style={{ margin: 0, padding: 0 }}>
        <Container>
          <Section style={{ textAlign: 'left', direction: 'ltr' }}>
            <table
              align="right"
              cellPadding="0"
              cellSpacing="0"
              style={{
                tableLayout: 'fixed',
                borderCollapse: 'collapse',
                borderSpacing: 0,
              }}
            >
              <tbody>
                <tr>
                  <td style={{ paddingLeft: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Link
                        href={`https://itfocus.io/en/Resource/Detail/126982/?em=`}
                        target="_blank"
                        style={{ textDecoration: 'none', color: '#00008B' }}
                      >
                        <Img
                          src="https://via.placeholder.com/300"
                          alt="Palo Alto Networks"
                          style={{ height: 'auto' }}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>   
            <Text
              style={{
                lineHeight: '1.5em',
                color: '#000000',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                margin: 0,
                padding: 0,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailComponent;
