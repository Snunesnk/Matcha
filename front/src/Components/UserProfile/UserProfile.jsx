import './UserProfile.css'

const DUMMY_USER = {
    firstname: 'John',
    surname: 'Doe',
    dateOfBirth: '2000-01-10',
    email: 'john.doe@test.com',
    login: 'john.doe',
    bio: 'my biiiioooooo',
    gender: 'f',
    imgA: 'https://picsum.photos/200/300',
    imgB: 'https://picsum.photos/200/300',
    imgC: 'https://picsum.photos/200/300',
    imgD: 'https://picsum.photos/200/300',
    imgE: 'https://picsum.photos/200/300',
    tags: [
        { bwid: 'tag1' },
        { bwid: 'tag2' },
        { bwid: 'tag3' },
        { bwid: 'tag4' },
    ],
}

const UserProfile = () => {
    return (
        <div id="user-profile-container">
            <div id="user-profile-main-picture">
                <img src={DUMMY_USER.imgA}></img>
            </div>
            <div id="user-profile-name"></div>
            <div id="user-profile-infos"></div>
            <div id="user-profile-pictures"></div>
        </div>
    )
}

export default UserProfile
