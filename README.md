# Software Requirements Specification for Filmder

## Introduction
1. <b>Purpose</b> 
    <p style='text-align: justify;'>
    This document represent the Software Requirements Specification (SRS) for the FilmderAPP. It is designed and written primarily for the developers involved in this project. It's purpose is to describe the scope, both functional and non-functional requirements, as well as the design constraints of the project. Furthermore, this project shows how the system's interfaces are designed in detail. [1]
    <p>

2. <b>Scope</b> 
    <p style='text-align: justify;'>
    The FilmderApp is a mobile app that cater the needs and desires of movie enthusiasts, offering a comprehensive solution for tracking, discovering and recommending films.

    The primary purpose of Filmder is to empower users with the ability to discover films tailored to their individual tastes and preferences. Moreover, the app promotes social interactions and engagement by allowing users to connect with each other to find films in their common niche.

    Above all, we ought to create a place for film aficionados, where they can expand their cinematic horizons. 
    <p>

3. <b>Definitions, acronyms</b> 

    | Definition | Explanation                         |
    |------------|-------------------------------------|
    | Def1       | Exp1                                |


    | Acronym | Explanation                         |
    |---------|-------------------------------------|
    | FD      | FilmderApp                          |
    | GH      | GitHub                              |
    | SRS     | Software Requirements Specification |
    | DB      | DataBase                            |
    | DBMS    | DataBase Management System          |
    | RN      | ReactNative                         |

4. <b>Reference documents</b> 
    * GH link: https://github.com/KaWis17/Filmder
    * Jira link: https://kapelakapelki.atlassian.net/jira/software/projects/SCRUM/boards/1

5. <b>Overview</b> <br />
    Members of a team:
    1. Mariia Hnatiuk
    2. Bartosz Tatys 
    3. Paweł Cirko
    4. Jan Poręba
    5. Krzysztof Wiśniewski

    <p style='text-align: justify;'>
    Next part of the SRS will focus on overall description of our programming endeavor, but also on a more specific requirements for different part of the system. 
    <p>

## General description
1. <b>Product perspective</b> <br />
    * Mobile application: Offers operating support for Android and IOS.
    * Large database of films (including a short decsription).
    * User account: The system allows the user to create their accounts in the system and provide features of updating and viewing profiles.
    * Number of users being supported by the system: Though the number is precisely not mentioned but the system is able to support a large number of online users at the same time.
    * Comunication between profiles: allows user to privately communicate between each other.
    * Generating film preferences for every user by analyzing users previous choices.
    
2. <b>User characteristics</b> <br />
    <p style='text-align: justify;'>
    The primary user of FD is a movie enthusiast. This group consists of people who vary in background and move preference. However, the common factor is that they are in most cases 'tech-savvy' and quickly adapt to new user interfaces. It is vital to provide them with high-quality and accurate predictions about their movie taste. As the primary target is the young generation, they will highly appreciate seamless user experience and social futures to connect to other like-minded individuals.
    The administrator is expected to be familiar with the interface of the tech support system.
    </p>
3. <b>Constraints</b> <br />
    * OS constraint - an app must be compatible with iOS 16 and Android 12 versions.
    * Network constraint - an app must function both on Wi-Fi networks and Mobile Data. It should handle occasional network disruptions.
    * Legal compliance - user data should be protected by standards required by the EU regulations.
    * Platform constraints - an app should contain all requirements to deploy it on AppStore and PlayStore.
    * Performance constraint - an app must load within 5 seconds on a middle-tier phones.
    * Integration constraint - an app should support user authentication via Google OAuth.
    * Framework constraint - an app must be compatible with third-party libraries licensing requirements.
    * Scalable constraint - an app will be designed to support future scaling 
4. Assumptions and Dependencies
    <p style='text-align: justify;'>
    Performance of FD highly depends on the internet quality of user. Also some differences could appear due to different operation systems.
    </p>
5. <b>Tools and Technologies</b>
    * React Native
    * Firebase Cloud Firestore - document database
    * TMDP API - it uses online database of films 

## Specific requirements 
1. External interface requirements
    * User interfaces
    * Hardware interfaces
    * Software interfaces 
    * Communication interfaces
2. Functional requirements
    * Enable a user to create a profile.
    * Enable a logged in user to ask update his profile which includes his film preferences and profile picture.
    * Enable a logged in user to swipe films.
    * Enable a logged in user to check films information.
    * Enable a logged in user to communicate with other users and add users to friend list.
3. <b>Performance requirements</b> <br />
    * Performance - The system must be interactive and the delays involved must be less.
    * Safety - Information transmission should be securely transmitted to server without any changes in information.
    * Reliability - Users can access their profile 98% of the time without failure.
4. Design constraints
    * Standards compliance
    * Hardware limitations
5. Software system attributes
    * Security - The main security concern is for users account hence proper login mechanism should be used to avoid hacking. 
    * Maintainability - Sending user suggestions to admins allows FD to be up-to-date.
    * Usability - As the system is easy to handle and navigates in the most expected way with no delays. 
6. Other requirements

## Businnes Logic Elements
Matching films to user 

The first part of movie proposal is to decide whether to pick title based on user preferences or something based on recent trends.

Genre score system: 

All film categories receive a certain weight, which should reflect the user's interest in this category.
At the beginning all the weights are zeros. If user wants to watch film belonging to some categories, the weights increase each one by 1. If he or she don't want, then it decrease by 1 (but at most up to 0). User will be able to review the film. The rate will be number from {0, 1, 2, 3, 4, 5}. If it is less then 3, then the weight of each catogories, that rated film belongs, decreases by 1 (but at most up to 0). In case of it is 4, they increases by 1. If the rate is 5, weight of each genre increases by 2.


Then, a film category is drawn, and the probability of drawing a given category is equal to the category weight divided by the sum of the weights of all categories. Then, appliaction fetch from API a dozen or so films from this category. 

This score system allows to adapt to the user's preferences in a short time. The entry threshold for algorithm is sum of weights at least 10. Below it application fetch trending fovies. This initial learning prevents "stacking" the algorithm on first a few liked genres.

## Github rules
Branch main now requires a pull request before merging. It requires 2 approving reviews including review from the code owner. Documentation of changes is needed for a positive review.

### Workflow
Move tasks between categories on Jira Software freely. Once a task ends up in 'Done', it is considered finished. If any issues arise, create new tasks to address them. After a pull request is created, include the link to it in the task, i.e. Review link: <https://kapelakapelki.atlassian.net/browse/SCRUM-68>

Feel free to push any changes to your own branches. Review branches must be named after the task they address, e.g. SCRUM-68

### Commit format
Commit messages must be at most 80 columns wide and use the following format:
```
SCRUM-X: Short description

Detailed description of what has been done, changed, addressed.
```
Example:
```
SCRUM-68: Create Github Rules

Created set of rules which will guide team members how to properly use github (branches, reviews and ect.) and add it to the documentation.
```

## Appendices

### Revision history

| Date      | Author               | Version | Change reference            |
|-----------|----------------------|---------|-----------------------------|
| 20 X 2023 | Krzysztof Wiśniewski | 0.1     | SRS structure |
| 20 X 2023 | Krzysztof Wiśniewski | 0.2     | Purpose, Scope, Acronyms, References, Overview |
| 20 X 2023 | Krzysztof Wiśniewski | 0.3     | Drafts |
| 22 X 2023 | Krzysztof Wiśniewski | 0.4     | Demo |
| 22 X 2023 | Krzysztof Wiśniewski | 0.5     | Constraints, User Characteristics |
| 23 X 2023 | Mariia    Hnatiuk    | 0.6     | Functional / Non functional requirements |
| 24 X 2023 | Bartosz Tatys        | 0.7     | Businnes Logic Elements |
| 29 X 2023 | Mariia Hnatiuk       | 0.8     | Section for Tools and Technologies (needs to be extended) |



### Drafts 
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/kUuHn3DL3q8/0.jpg)](https://youtube.com/shorts/kUuHn3DL3q8)


![draft01](drafts/draft01.jpg)
![draft02](drafts/draft02.jpg)
![draft03](drafts/draft03.jpg)
![draft04](drafts/draft04.jpg)
![draft05](drafts/draft05.jpg)
![draft06](drafts/draft06.jpg)


## Index
[1] https://se.inf.ethz.ch/courses/2011a_spring/soft_arch/exercises/02/Requirements_Specification.pdf

