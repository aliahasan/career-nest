
const About = () => {
  return (
    <div>
       <div className="grid grid-flow-col text-center p-2">  
        <table className="border-Collapse border border-green-900"> 
        <thead> 
          <tr> 
            <th className="border border-green-600">Frameworks</th> 
            <th className="border border-green-600">Release Year</th> 
          </tr> 
        </thead> 
        <tbody> 
          <tr> 
            <td className="border border-green-600">Tailwind CSS</td> 
            <td className="border border-green-600">2019</td> 
          </tr> 
          <tr> 
            <td className="border border-green-600">Bulma</td> 
            <td className="border border-green-600">2016</td> 
          </tr> 
          <tr> 
            <td className="border border-green-600">Bootstrap</td> 
            <td className="border border-green-600">2011</td> 
          </tr> 
        </tbody> 
        </table> 
    </div>  
    </div>
  );
};

export default About;