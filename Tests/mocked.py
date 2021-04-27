#pylint: disable=W0107
#pylint: disable=C0413
'''
    This file tests adding person to the database.
'''

import unittest
from unittest.mock import patch
import os
import sys
# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../'))
from app import add_user
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_INCORRECT = "incorrect"

INITIAL_USERNAME = 'user1'


class AddUserTestCase(unittest.TestCase):
    '''class for testing the add user function of the database'''
    def setUp(self):

        self.success_test_params = [
            {
                KEY_INPUT: 'Amy',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Amy'],
            },
            {
                KEY_INPUT: 'Bob',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Amy', 'Bob'],
            },
            {
                KEY_INPUT: 'Charlie',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Amy', 'Bob', 'Charlie'],
            },
        ]
        self.failure_test_params = [
            {
                KEY_INPUT: 'Amy',
                KEY_EXPECTED: [INITIAL_USERNAME],
            },
            {
                KEY_INPUT: 'Bob',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Bob'],
            },
            {
                KEY_INPUT: 'Charlie',
                KEY_EXPECTED: ['Charlie'],
            },
        ]
        initial_person = models.Person(username=INITIAL_USERNAME, recs="Greys Anatomy")
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, username):
        '''Function used to add to the database'''
        self.initial_db_mock.append(username)

    def mocked_db_session_commit(self):
        '''Function used to commit to the database'''
        pass

    def mocked_person_query_all(self):
        '''Function for querying (get) from database'''
        #if count == 1:
        #    self.initial_db_mock = [amy]
        #elif count == 2:
        #    self.initial_db_mock = [bob, charlie]
        #elif count == 3:
        #    self.initial_db_mock = [amy, charlie, bob]
        return self.initial_db_mock

    #def mocked_person_query_get(self):
    #    return self.initial_db_mock.get

    def test_success(self):
        '''Test if adding people to the database is successful'''
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        actual_result = add_user(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]

                        self.assertEqual(len(actual_result),
                                         len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])

    def test_failure(self):
        '''Testing to make sure these cases never occur when adding to database'''
        for test in self.failure_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        actual_result = add_user(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]

                        self.assertNotEqual(len(actual_result),
                                            len(expected_result))
                        self.assertNotEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()
    