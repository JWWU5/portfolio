import '../CSS/homepage.css'

import coverImage from '../assets/cover.PNG';
import vARtebraeImage from '../assets/vARtebrae.png';
import vARtebraeTitle from '../assets/vARtebrae-title.PNG';
import vARtebraeCover from '../assets/vARtebrae-cover.png';
import forestImage from '../assets/forest.png';
import forestTitle from '../assets/forest-title.PNG';
import forestCover from '../assets/forest-cover.png';

function HomePage() {

  return (
    <>
      <section id="heading">
        <img src={coverImage} alt="Cover" />
      </section>
      <section id="self_intro">
        <p>
          Hi! I'm a UX/UI Developer. I studied Master of Software Engineering in Human-Computer Interaction (HCI) 
          at the University of Melbourne. I'm skilled in creating intuitive and engaging interfaces with Unity, 
          for interactive games and XR applications for healthcare. I also have extensive experience in web and 
          Android development, with a strong passion for designing accessible, user-centred experiences across platforms.
          <br /><br />
          I am innovative and eager to learn more about new tools and technologies. In addition, I am proficient 
          in software requirements gathering, Agile methodologies, and technical documentation.
          <br /><br />
          I'm looking for positions in UX/UI development for both Unity and web. I'm also open to opportunities 
          in full-stack development, as I'm currently building my skills in this area through self-learning.
        </p>
      </section>

      <section id="project">
        <div className="card-container">
          <a href="projects/vARtebrae.html">
            <div className="card">
              <div className="wrapper">
                <img src={vARtebraeImage} className="cover-image" alt="vARtebrae" />
              </div>
              <img src={vARtebraeTitle} className="title" alt="vARtebrae Title" />
              <img src={vARtebraeCover} className="character" alt="vARtebrae Cover" />
            </div>
          </a>
          
          <a href="projects/forest.html">
            <div className="card">
              <div className="wrapper">
                <img src={forestImage} className="cover-image" alt="Forest" />
              </div>
              <img src={forestTitle} className="title" alt="Forest Title" />
              <img src={forestCover} className="character" alt="Forest Cover" />
            </div>
          </a>
        </div>
      </section>
    </>
  )
}

export default HomePage;