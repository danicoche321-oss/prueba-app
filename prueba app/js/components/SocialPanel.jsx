const SocialPanel = ({ user, userProfile }) => {
    const [activeTab, setActiveTab] = React.useState('friends');
    const [friends, setFriends] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [viewFriend, setViewFriend] = React.useState(null);

    // Fetch Friends
    React.useEffect(() => {
        const unsubscribe = db.collection('users').doc(user.uid).collection('friends').onSnapshot(snapshot => {
            const friendsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFriends(friendsList);
        });
        return () => unsubscribe();
    }, [user.uid]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm || searchTerm.length < 3) return;

        setLoading(true);
        try {
            // Search in public collection
            // Note: Firestore doesn't do "contains" easily without paid extensions like Algolia.
            // We will do a direct match on safe-email for version 1, or simple startAt.
            const safeEmail = searchTerm.toLowerCase().replace(/\./g, '_');

            // Try exact match by ID (email_safe)
            const doc = await db.collection('users_public').doc(safeEmail).get();

            if (doc.exists) {
                setSearchResults([{ id: doc.id, ...doc.data() }]);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error searching:", error);
        }
        setLoading(false);
    };

    const addFriend = async (friendData) => {
        try {
            // Add to my friends
            await db.collection('users').doc(user.uid).collection('friends').doc(friendData.uid).set({
                uid: friendData.uid,
                name: friendData.name || friendData.email.split('@')[0],
                email: friendData.email,
                photo: friendData.photo,
                lastWorkout: null, // Will be updated eventually if we sync logic
                addedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Add me to their friends (Reciprocal? Or standard Follow logic. Let's do Reciprocal for simplicity for now to allow Nudges)
            await db.collection('users').doc(friendData.uid).collection('friends').doc(user.uid).set({
                uid: user.uid,
                name: userProfile?.name || user.email.split('@')[0],
                email: user.email,
                photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
                addedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert("¡Amigo añadido!");
            setSearchTerm('');
            setSearchResults([]);
            setActiveTab('friends');
        } catch (error) {
            console.error("Error adding friend:", error);
            alert("Error al añadir amigo");
        }
    };

    const sendNudge = async (friendId, friendName) => {
        try {
            await db.collection('users').doc(friendId).collection('inbox').add({
                type: 'nudge',
                fromUid: user.uid,
                fromName: userProfile?.name || user.email.split('@')[0],
                message: "¡A entrenar! 💪",
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
            alert(`¡Has gritado a ${friendName}!`);
        } catch (error) {
            console.error("Error sending nudge:", error);
        }
    };

    return (
        <div className="pb-20">
            <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                <button
                    onClick={() => setActiveTab('friends')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'friends' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                    Mis Amigos
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'add' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                    Añadir
                </button>
            </div>

            {activeTab === 'friends' && (
                <div className="space-y-3">
                    {friends.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <i data-lucide="users" className="w-12 h-12 mx-auto mb-3 opacity-20"></i>
                            <p>No tienes amigos aún.</p>
                            <button onClick={() => setActiveTab('add')} className="mt-4 text-primary-600 font-bold text-sm">Buscar amigos</button>
                        </div>
                    ) : (
                        friends.map(friend => (
                            <div key={friend.uid} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={friend.photo} className="w-10 h-10 rounded-full bg-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{friend.name}</h4>
                                        <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Online
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => sendNudge(friend.uid, friend.name)}
                                    className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors"
                                >
                                    <i data-lucide="megaphone" className="w-5 h-5"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'add' && (
                <div className="space-y-6">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="email"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Email de tu amigo..."
                            className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button type="submit" className="absolute right-2 top-2 p-1.5 bg-primary-600 text-white rounded-lg">
                            <i data-lucide="search" className="w-4 h-4"></i>
                        </button>
                    </form>

                    <div className="space-y-2">
                        {loading && <div className="text-center p-4"><i data-lucide="loader-2" className="w-6 h-6 animate-spin mx-auto text-primary-500"></i></div>}

                        {searchResults.map(result => (
                            <div key={result.uid} className="bg-white p-4 rounded-2xl shadow-lg border border-primary-100 flex items-center justify-between animate-fade-in">
                                <div className="flex items-center gap-3">
                                    <img src={result.photo} className="w-12 h-12 rounded-full bg-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{result.name}</h4>
                                        <p className="text-xs text-gray-400">{result.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addFriend(result)}
                                    className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800"
                                >
                                    Añadir
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
