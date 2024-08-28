import { useEffect, useState } from 'react';
import './App.css';
import { database } from './config/firebaseConfig';
import { collection, getDocs, onSnapshot} from 'firebase/firestore';

//imgs
import childrenBackground from './imgs/childrenBackground.jpg';


function App() 
{

  //variables 
  const [childrenList, setChildrenList] = useState([]);

  // useEffect(() => {
  //   const getChildrenList = async () =>
  //   {
  //     try
  //     {
  //       const data = await getDocs(collection(database, "score"));
  //       // filter out the firebase bullsh*t stuff
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(), 
  //         id: doc.id,
  //       }));
  //       // sort based on points
  //       const sortedData = filteredData.sort((a, b) => b.points - a.points);
  //       setChildrenList(sortedData);
  //     }
  //     catch(err)
  //     {
  //       console.error(err);
  //     }
  //   };
  //   getChildrenList();
  // }, [])
  useEffect(() => 
  {
    const unsubscribe = onSnapshot(collection(database, "score"), (snapshot) => 
    {
      // Filter and sort data from snapshot
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const sortedData = filteredData.sort((a, b) => b.points - a.points);
      setChildrenList(sortedData);
    
    }, 
    (err) => 
    {
      console.error("Failed to fetch data: ", err);
    });
    localStorage.setItem('autentif', false);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      
      <div 
        className='title' 
        style={{
          backgroundImage: `url(${childrenBackground})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h1 className='titleH1'>Bodka za prázdninami 2024</h1>
      </div>

      <div className='consoleTable'>
        <table id='childrenTable'>
          <thead>
            <tr>
              <th>Meno hráča</th>
              <th>Počet bodov</th>
            </tr>
          </thead>
          <tbody>
            {
              childrenList.map((children) => (
                <tr key={children.id}>
                  <td>{children.name}</td>
                  <td>{children.points}</td>
                </tr>                
              ))
            }
          </tbody>
        </table>
        
      </div>
    </>
  );
}

export default App;
