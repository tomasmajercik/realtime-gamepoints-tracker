import { useEffect, useState, useRef } from 'react';
import './background.css';
import { database } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';

import AddPlayer from '../components/addPlayer';

//imgs
import loadedGif from '../imgs/loaded.gif';

function Background() 
{
  // Variables
  localStorage.setItem('preventFromReturn', 'true');
  const [childrenList, setChildrenList] = useState([]);
  const [error, setError] = useState("");
  const [operation, setOperation] = useState('add');

  const [showModal, setShowModal] = useState(false);

  const [showGif, setShowGif] = useState(false);

  const [selectedChild, setSelectedChild] = useState(null);
  const [pointsCount, setPointsCount] = useState(0);

  const navigate = useNavigate();
  // Functions
  
  useEffect(() => {
    const autentif = localStorage.getItem('autentif');
    if (autentif !== 'true') 
    {
      navigate("/");
    }
  }, [navigate]);

//   useEffect(() => {
//     const getChildrenList = async () =>
//     {
//       try
//       {
//         const data = await getDocs(collection(database, "score"));
//         // filter out the firebase bullsh*t stuff
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(), 
//           id: doc.id,
//         }));
//         // sort based on points
//         const sortedData = filteredData.sort((a, b) => b.points - a.points);
//         setChildrenList(sortedData);
//       }
//       catch(err)
//       {
//         console.error(err);
//       }
//     };
//     getChildrenList();
//   }, [])

useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "score"), (snapshot) => {
      const childrenData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedData = childrenData.sort((a, b) => b.points - a.points);
      setChildrenList(sortedData);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const selectBtnClick = (child) =>
  {
    setSelectedChild(child);
  }

  const handleSubmit = async () => {
    if (selectedChild && selectedChild.id) {
      try {
        const childDocRef = doc(database, "score", selectedChild.id);
        const currentPoints = selectedChild.points;

        // Calculate new points based on operation
        const newPoints = operation === 'add' 
          ? currentPoints + pointsCount
          : currentPoints - pointsCount;

        await updateDoc(childDocRef, {
          points: newPoints
        });


        // alert('Points updated successfully!');
        setShowGif(true);
        setTimeout(() => {
            setShowGif(false);
        }, 1800);
        setSelectedChild(null);
        setError("");
        setPointsCount(0);


        // Optional: Refresh the list
        const updatedList = childrenList.map(child =>
          child.id === selectedChild.id ? { ...child, points: newPoints } : child
        );
        setChildrenList(updatedList);
      } catch (err) {
        setError("Failed to update points.");
        console.error(err);
      }
    } else {
      setError("Žiadne dieťa nebolo vybrané.");
    }

  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  

  // Layout
  return (
    <>
    {showGif && 
        <div id='gif'>
            <img id='giff' src={loadedGif}/>
        </div>
    }

    <button className='addPlayer' onClick={toggleModal}>+</button>

    <AddPlayer 
        showModal={showModal} 
        toggleModal={toggleModal} 
    />
      
    
    
      <div>
        <h1 className='bckH1'>Pridať alebo ubrať body:</h1>
        

        <h4 className='bckH4'>vyberte počet bodov:</h4>
        <div className='pointcountsArea'>
            <input type="range" min="-20" max="20" value={pointsCount} onChange={(e) => setPointsCount(parseInt(e.target.value, 10))}/>
            <input type="number" min="-20" max="20" value={pointsCount} onChange={(e) => setPointsCount(parseInt(e.target.value, 10))}/>
        </div>

        <h4 className='bckH4'>vyberte dieťa:</h4>
        <div className='childpool'>
            {
                childrenList.map((children) => (
                    <button key={children.id} className='selectBtn' onClick={() => selectBtnClick(children)}>{children.name}</button>
                ))
            }
        </div>
        <button 
            className='changePointsButton' 
            type='submit'
            onClick={handleSubmit}
        >
            Zmeniť!
        </button>
        {error && <p className='error'>{error}</p>}
      </div>
    </>
  );
}

export default Background;