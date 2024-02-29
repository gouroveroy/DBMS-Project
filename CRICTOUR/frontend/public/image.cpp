#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<int> image;
    int count = 0;
    for (int i = 71101; i < 79112; i += 1000)
    {
        for (int j = i; j < i + 11; j++)
        {
            // cout << j << " ";
            image.push_back(j);
            // count++;
        }
        // cout << endl;
    }
    // cout << count << endl;
    for (int i = 1; i <= 99; i++)
    {
        cout << "{ oldFilename: \"" << i << ".jpg\", newFilename: \"" << image[i - 1] << ".png\" }," << endl;
    }
    return 0;
}
