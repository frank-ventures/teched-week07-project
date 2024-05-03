import "./aboutpage.css";

export function AboutPage() {
  return (
    <>
      <div className="about-info">
        <h2>About this app</h2>
        <p>
          This app has been made by Frankie Shrieves as part of the{" "}
          <a
            href="https://techeducators.co.uk/course/software-development-bootcamp"
            target="_blank"
          >
            Software Development Bootcamp.
          </a>
        </p>
        <p>
          The Week Seven project was to create a full-stack application (a
          client, a server and a databse) using React, Express, Postgres and
          Supabase.
        </p>
        <p>
          This app allows you to write about your experience and interactions
          with Tech Educators on the{" "}
          <a href="../submit">&ldquo;Tell us your story&rdquo;</a> page, and
          also view reviews left by others on the{" "}
          <a href="../reviews">&ldquo;Reviews&rdquo;</a> page, as well as sort,
          search and categorise them.
        </p>
        <p>
          Frankies&apos;:{" "}
          <a
            href="https://www.linkedin.com/in/frankie-shrieves/"
            target="_blank"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/frank-ventures" target="_blank">
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/frank-ventures/teched-week07-project"
            target="_blank"
          >
            GitHub Repo for this project
          </a>{" "}
        </p>
        <p className="center">
          This page has not been comissioned by Tech Educators{" "}
          <em>(but hopefully has been enjoyed by them)</em>
        </p>
      </div>
    </>
  );
}
