import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
} from "@react-email/components";

const SimpleEmailTemplate = ({titleText, bodyText, footerText}:any) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our service! We are glad to have you.</Preview> {/* Email preview text */}
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>{titleText}</Heading>
          </Section>

          <Section style={section}>
            <Text style={text}>
              {bodyText}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerTextStyle}>
              {footerText}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const header = {
  borderBottom: "1px solid #eeeeee",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const heading = {
  fontSize: "24px",
  color: "#333333",
  margin: 0,
};

const section = {
  padding: "10px 0",
};

const text = {
  fontSize: "16px",
  color: "#333333",
  lineHeight: "1.5",
};

const link = {
  display: "inline-block",
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  marginTop: "20px",
};

const footer = {
  borderTop: "1px solid #eeeeee",
  paddingTop: "10px",
  marginTop: "20px",
};

const footerTextStyle = {
  fontSize: "14px",
  color: "#888888",
};

export default SimpleEmailTemplate;
