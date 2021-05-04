#pylint: disable=C0301
"""Python file returns the movie recommendation and it's associated poster"""

def get_recommendation(num, chosen_genre):
    """Returns a movie recommendation based on the given genre"""
    print("RECEIVED!!! ")
    print(chosen_genre)
    title = []
    if 'Action' in chosen_genre:
        title = ['Fight Club', 'Inception', 'Avengers: Endgame', 'Fast and Furious', 'Wanda Vision']
    elif chosen_genre == 'Comedy':
        title = ['The Big Bang Theory', 'Glee', 'Friend', 'The Office', 'Central Intelligence']
    elif chosen_genre == 'Fantasy':
        title = ['Divergent', 'Star Wars', 'Percy Jackson: The Lightning Thief', 'Harry Potter: Prisoner of Azkaban', 'Game of Thrones']
    elif chosen_genre == 'Horror':
        title = ['It', 'Ma', 'The Quiet Place', 'The Bride of Frankenstein', 'American Horror Story']
    else:
        title = ['The Notebook', 'The Fault in Our Stars', 'Little Women', 'Titanic', '27 Dresses']
    print("TITLEEEEEE")
    print(title[num])
    print(num)
    return title[num]

def get_picture(num, chosen_genre):
    """Returns movie/tv poster associated with the movie"""
    cover = []
    if 'Action' in chosen_genre:
        cover = [
            'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
            'https://flxt.tmsimg.com/assets/p7825626_p_v10_af.jpg',
            'https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2018/12/07103756/EndGameShort.gif',
            'https://static.wikia.nocookie.net/fastandfurious/images/0/04/The_Fast_and_the_Furious_%28DVD_Cover%29.jpeg/revision/latest?cb=20150501043627',
            'https://cdn.flickeringmyth.com/wp-content/uploads/2021/02/WandaVision-midseason-poster-600x900.jpg'
            ]
    elif chosen_genre == 'Comedy':
        cover = [
            'https://i5.walmartimages.com/asr/b2953acd-2a8d-4cff-b284-5abb514e909a_1.a0ba883abdb2e3655e674107d3817cfd.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
            'https://m.media-amazon.com/images/M/MV5BYWJhZjNjZjUtM2JlZC00ZWE3LWJmZDItMDRhMWJkMTJhZDhkXkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_.jpg',
            'https://i.pinimg.com/originals/6f/2c/aa/6f2caa7a6687163287390c27a74ece30.gif',
            'https://cdn.shopify.com/s/files/1/0969/9128/products/91TmR1v-qRL._RI_6381f3ff-2abf-4575-9379-2256bcacf06c.jpg?v=1556951531',
            'https://images.moviesanywhere.com/85373ff29e53d8798332de11eb578e89/32984944-6315-48ea-92d5-54c63c3b984e.jpg'
            ]
    elif chosen_genre == 'Fantasy':
        cover = [
            'https://i.pinimg.com/originals/45/d4/bc/45d4bc41e2a8e4a68205c103df23bb89.jpg',
            'https://i.pinimg.com/originals/9c/60/11/9c601107244fdaa89e66577d2e59190c.gif',
            'https://www.themoviedb.org/t/p/original/hal0tSr1vWcANNeLMeJhotGrrhx.jpg',
            'https://static.wikia.nocookie.net/harrypotter/images/a/a8/Harry_Potter_and_the_Prisoner_of_Azkaban_2.jpg/revision/latest?cb=20130803163319',
            'http://images6.fanpop.com/image/photos/38500000/Game-of-Thrones-Season-5-Episode-Poster-game-of-thrones-38564696-268-350.gif'
            ]
    elif chosen_genre == 'Horror':
        cover = [
            'https://i.pinimg.com/originals/6d/20/d1/6d20d140a8c63c4a46dc228b125237b0.jpg',
            'https://cdn.shopify.com/s/files/1/0747/3829/products/mL3085_1024x1024.jpg?v=1571445679',
            'https://images-na.ssl-images-amazon.com/images/I/81yBDYZXSZL._AC_SL1500_.jpg',
            'https://dyn1.heritagestatic.com/lf?set=path%5B1%2F3%2F6%2F9%2F5%2F13695262%5D&call=url%5Bfile%3Aproduct.chain%5D',
            'https://images-na.ssl-images-amazon.com/images/I/510ONzovHGL._AC_SY450_.jpg'
            ]
    else:
        cover = [
            'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/a02f2674426d0953c7e2d0a21c4116fb_48dcfda4-e1c6-492c-8234-b047bf783188_240x360_crop_center.progressive.jpg?v=1573617287',
            'https://data.whicdn.com/images/117189757/original.gif',
            'https://media2.giphy.com/media/Vd8B2c0HvLOFw4xAV7/200.gif',
            'http://3.bp.blogspot.com/-u0JR-K9PkO8/VXWqDJW3TmI/AAAAAAAASgM/uzmDwkYMrWA/s1600/Titanic%2BNew%2BGIF.gif',
            'https://static.tvtropes.org/pmwiki/pub/images/27-dresses-poster-resize.JPG'
            ]
    return cover[num]
