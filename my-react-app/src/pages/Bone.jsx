import '../CSS/project.css';

import vARtebraeImage from '../assets/vARtebrae_2.png';

function Bone() {

    return (
      <>
        <section id="project">
          <img src={vARtebraeImage} className="cover-image" alt="vARtebrae" />
          <h1>vARtebrae</h1>
        </section>
        <section id="graph">

        </section>
        <section id="content">
          <h1>content</h1>
        </section>
      </>
    )
}

export default Bone;