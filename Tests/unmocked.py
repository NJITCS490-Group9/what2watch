"""A dummy docstring."""
import os
import sys
import unittest

sys.path.append(os.path.abspath('../'))

class UnmockedTests(unittest.TestCase):
    """A dummy docstring."""
    def test_forlowercasename(self):
        """A dummy docstring."""
        self.assertTrue('anshul'.islower())
        self.assertFalse('ANSHUL'.islower())
        self.assertFalse('ANsHuL'.islower())
        self.assertFalse('aNsHUl'.islower())


    def test_googleapi_username(self):
        """A dummy docstring."""
        userlogin = "Logged in successfully welcome"
        self.assertEqual(userlogin, "Logged in successfully welcome")
        self.assertNotEqual(userlogin, "Cannot Login")
        self.assertNotEqual(userlogin, "Logged Out Successfully!")
        self.assertNotEqual(userlogin, "Couldn't find your Google Account")
        self.assertNotEqual(userlogin, "Wrong Password.")

if name == "main":
    unittest.main()
